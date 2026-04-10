import { formatCurrency, formatVolume, formatDateTime, formatTime, translateStatus, getStatusColor } from '../format';

describe('formatCurrency', () => {
  it('formats number as Brazilian currency', () => {
    expect(formatCurrency(1234.56)).toMatch(/R\$\s1\.234,56/);
    expect(formatCurrency(0)).toMatch(/R\$\s0,00/);
    expect(formatCurrency(1000000)).toMatch(/R\$\s1\.000\.000,00/);
  });
});

describe('formatVolume', () => {
  it('formats billions', () => {
    expect(formatVolume(1500000000)).toBe('R$ 1.5B');
  });

  it('formats millions', () => {
    expect(formatVolume(2500000)).toBe('R$ 2.5M');
  });

  it('formats regular amounts', () => {
    expect(formatVolume(1234.56)).toMatch(/R\$\s1\.234,56/);
  });
});

describe('formatDateTime', () => {
  it('formats date and time in Brazilian format', () => {
    const date = new Date('2023-10-15T14:30:00');
    expect(formatDateTime(date)).toBe('15/10/2023, 14:30');
  });
});

describe('formatTime', () => {
  it('formats time only', () => {
    const date = new Date('2023-10-15T14:30:00');
    expect(formatTime(date)).toBe('14:30');
  });
});

describe('translateStatus', () => {
  it('translates APPROVED', () => {
    expect(translateStatus('APPROVED')).toBe('Aprovado');
  });

  it('translates PENDING', () => {
    expect(translateStatus('PENDING')).toBe('Pendente');
  });

  it('translates REJECTED', () => {
    expect(translateStatus('REJECTED')).toBe('Rejeitado');
  });

  it('returns original status if not found', () => {
    expect(translateStatus('UNKNOWN')).toBe('UNKNOWN');
  });
});

describe('getStatusColor', () => {
  it('returns green for APPROVED', () => {
    expect(getStatusColor('APPROVED')).toBe('bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300');
  });

  it('returns yellow for PENDING', () => {
    expect(getStatusColor('PENDING')).toBe('bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300');
  });

  it('returns red for REJECTED', () => {
    expect(getStatusColor('REJECTED')).toBe('bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300');
  });

  it('returns gray for unknown status', () => {
    expect(getStatusColor('UNKNOWN')).toBe('bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300');
  });
});