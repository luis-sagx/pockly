import { describe, expect, it } from 'vitest';
import { importLegacyNotes, priorityToHorizon } from './board.utils';

describe('board migration utilities', () => {
  it('maps old quick-notes priority columns to personal time horizons', () => {
    expect(priorityToHorizon('high')).toBe('today');
    expect(priorityToHorizon('medium')).toBe('week');
    expect(priorityToHorizon('low')).toBe('someday');
  });

  it('imports old quick-notes JSON without losing priority as a tag', () => {
    const imported = importLegacyNotes(
      JSON.stringify({
        version: 1,
        notes: [
          {
            id: 'n1',
            title: 'Ship migration',
            description: 'Keep local-only users safe',
            priority: 'high',
            checklist: [{ id: 'c1', text: 'Export', checked: false }],
            createdAt: 10,
            updatedAt: 20,
          },
        ],
      }),
    );

    expect(imported).toEqual([
      expect.objectContaining({
        id: 'n1',
        title: 'Ship migration',
        horizon: 'today',
        priority: 'high',
        checklist: [{ id: 'c1', text: 'Export', checked: false }],
      }),
    ]);
  });
});
