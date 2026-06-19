export function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getWeekStart(date = new Date()): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  d.setDate(d.getDate() + diff);
  return d;
}

export function getWeekDays(weekStart: Date): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return getLocalDateKey(d);
  });
}

export function currentWeekDays(today = new Date()): Array<{ date: string; label: string; dayNum: string }> {
  const days = getWeekDays(getWeekStart(today));
  return days.map((date) => {
    const [y, m, d] = date.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    return {
      date,
      label: new Intl.DateTimeFormat('en', { weekday: 'short' }).format(dt),
      dayNum: String(d),
    };
  });
}

export function lastNDays(count: number, today = new Date()): string[] {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (count - 1 - index));
    return getLocalDateKey(date);
  });
}

export function currentStreak(logDates: string[], today = new Date()): number {
  const dates = new Set(logDates);
  let streak = 0;
  const cursor = new Date(today);
  while (dates.has(getLocalDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function weeklyHistory(
  logDates: string[],
  numWeeks = 16,
  today = new Date()
): Array<{ weekLabel: string; completed: number }> {
  const logSet = new Set(logDates);
  const weekStart = getWeekStart(today);
  return Array.from({ length: numWeeks }, (_, i) => {
    const ws = new Date(weekStart);
    ws.setDate(weekStart.getDate() - (numWeeks - 1 - i) * 7);
    const days = getWeekDays(ws);
    const completed = days.filter((d) => logSet.has(d)).length;
    const label = ws.toLocaleDateString('en', { month: 'short', day: 'numeric' });
    return { weekLabel: label, completed };
  });
}

export function habitStats(logDates: string[], today = new Date()) {
  const last7 = lastNDays(7, today);
  const completedLast7Days = last7.filter((day) => logDates.includes(day)).length;
  return {
    streak: currentStreak(logDates, today),
    completedLast7Days,
    weeklyCompletionRate: Math.round((completedLast7Days / 7) * 100),
    totalCheckIns: logDates.length,
  };
}
