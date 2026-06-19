export function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
