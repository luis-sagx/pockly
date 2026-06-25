import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  const cronSecret = req.headers.get('x-cron-secret');
  if (cronSecret !== Deno.env.get('CRON_SECRET')) {
    return new Response('Forbidden', { status: 403 });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const now = new Date();

  const { data: users, error } = await supabase
    .from('notification_preferences')
    .select('user_id, timezone, reminder_time, habit_reminder_on, task_reminder_on, streak_alert_on, push_enabled');

  if (error || !users) {
    console.error('Failed to fetch preferences', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
  }

  const results = await Promise.allSettled(
    users.map(async (pref: any) => {
      if (!pref.push_enabled) return;

      const userNow = new Date(now.toLocaleString('en-US', { timeZone: pref.timezone }));
      const [remHour, remMin] = pref.reminder_time.split(':').map(Number);
      const diffMinutes = Math.abs(
        userNow.getHours() * 60 + userNow.getMinutes() - (remHour * 60 + remMin),
      );
      if (diffMinutes > 15) return;

      const today = userNow.toISOString().split('T')[0];

      let habitCount = 0;
      let streakAtRisk = false;

      if (pref.habit_reminder_on || pref.streak_alert_on) {
        const { data: habits } = await supabase
          .from('habits')
          .select('id')
          .eq('user_id', pref.user_id)
          .eq('archived', false);

        const habitIds = (habits ?? []).map((h: any) => h.id);

        if (habitIds.length > 0) {
          const { data: logs } = await supabase
            .from('habit_logs')
            .select('habit_id')
            .eq('user_id', pref.user_id)
            .eq('log_date', today)
            .in('habit_id', habitIds);

          const completedIds = new Set((logs ?? []).map((l: any) => l.habit_id));
          habitCount = habitIds.filter((id: string) => !completedIds.has(id)).length;

          const yesterday = new Date(userNow);
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayKey = yesterday.toISOString().split('T')[0];

          const { data: yesterdayLogs } = await supabase
            .from('habit_logs')
            .select('habit_id')
            .eq('user_id', pref.user_id)
            .eq('log_date', yesterdayKey)
            .in('habit_id', habitIds);

          const hadYesterday = new Set((yesterdayLogs ?? []).map((l: any) => l.habit_id));
          streakAtRisk = habitIds.some((id: string) => hadYesterday.has(id) && !completedIds.has(id));
        }
      }

      let taskCount = 0;
      if (pref.task_reminder_on) {
        const { data: tasks } = await supabase
          .from('notes')
          .select('id')
          .eq('user_id', pref.user_id)
          .eq('horizon', 'today');
        taskCount = (tasks ?? []).length;
      }

      const parts: string[] = [];
      if (pref.habit_reminder_on && habitCount > 0) {
        parts.push(`${habitCount} habit${habitCount > 1 ? 's' : ''} to complete`);
      }
      if (pref.task_reminder_on && taskCount > 0) {
        parts.push(`${taskCount} task${taskCount > 1 ? 's' : ''} for today`);
      }
      if (pref.streak_alert_on && streakAtRisk) parts.push('streak at risk!');
      if (parts.length === 0) return;

      const body = parts.join(' · ');
      const title = streakAtRisk ? '🔥 Streak at risk — Pockly' : '✅ Daily reminder — Pockly';

      const { data: subs } = await supabase
        .from('push_subscriptions')
        .select('*')
        .eq('user_id', pref.user_id);

      for (const sub of subs ?? []) {
        try {
          await sendWebPush(sub.endpoint, { title, body });
        } catch (e) {
          console.error('Push failed for', sub.endpoint, e);
        }
      }
    }),
  );

  return new Response(JSON.stringify({ processed: results.length }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

async function sendWebPush(endpoint: string, payload: { title: string; body: string }) {
  const pushPayload = JSON.stringify({
    title: payload.title,
    body: payload.body,
    icon: '/logo.png',
    badge: '/logo.png',
  });

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'TTL': '86400' },
    body: pushPayload,
  });

  if (!response.ok) throw new Error(`Push failed: ${response.status}`);
}
