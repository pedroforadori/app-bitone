import { renderHook, waitFor } from '@testing-library/react';
import { useContracts } from '../useContracts';

describe('useContracts', () => {
  it('should load contracts and stats after initialization', async () => {
    const { result } = renderHook(() => useContracts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.contracts.length).toBeGreaterThan(0);
    expect(result.current.stats.totalProcessed).toBeGreaterThanOrEqual(0);
    expect(result.current.isLive).toBe(true);
    expect(result.current.error).toBe(null);
  });
});