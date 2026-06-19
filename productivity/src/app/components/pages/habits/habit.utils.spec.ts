import { describe, expect, it } from 'vitest';
import { currentStreak, getLocalDateKey, habitStats, lastNDays } from './habit.utils';

describe('habit utilities', () => {
  it('formats local dates as YYYY-MM-DD', () => {
    expect(getLocalDateKey(new Date(2026, 5, 16))).toBe('2026-06-16');
  });

  it('returns the last N local days ending today', () => {
    expect(lastNDays(3, new Date(2026, 5, 16))).toEqual(['2026-06-14', '2026-06-15', '2026-06-16']);
  });

  it('computes consecutive streaks ending today', () => {
    expect(currentStreak(['2026-06-14', '2026-06-15', '2026-06-16'], new Date(2026, 5, 16))).toBe(3);
    expect(currentStreak(['2026-06-14', '2026-06-16'], new Date(2026, 5, 16))).toBe(1);
  });

  it('builds daily stats for the last 7 days', () => {
    expect(
      habitStats(['2026-06-10', '2026-06-12', '2026-06-13', '2026-06-15', '2026-06-16'], new Date(2026, 5, 16)),
    ).toEqual({
      streak: 2,
      completedLast7Days: 5,
      weeklyCompletionRate: 71,
      totalCheckIns: 5,
    });
  });
});
