/**
 * Custom Hook - useContracts
 * Gerencia estado de contratos com polling simulado
 */

import { useEffect, useState } from 'react';
import { Contract, DashboardStats } from '@/lib/types';
import { generateContracts, calculateStats } from '@/lib/mock-data';

interface UseContractsReturn {
  contracts: Contract[];
  stats: DashboardStats;
  isLoading: boolean;
  isLive: boolean;
  error: Error | null;
}

/**
 * Hook que simula polling de dados em tempo real
 * Refetch a cada 5 segundos para dar sensação de "live"
 */
export function useContracts(refetchInterval: number = 5000): UseContractsReturn {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProcessed: 0,
    totalVolume: 0,
    successRate: 0,
    pendingReview: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Carregamento inicial
    try {
      const initialContracts = generateContracts(63);
      setContracts(initialContracts);
      setStats(calculateStats(initialContracts));
      setIsLive(true);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao carregar dados'));
      setIsLoading(false);
    }

    // Polling simulado
    // const interval = setInterval(() => {
    //   try {
    //     // Simula adição de novos contratos
    //     setContracts((prev) => {
    //       const newContracts = generateContracts(Math.floor(Math.random() * 5) + 1);
    //       const updated = [...newContracts, ...prev].slice(0, 100); // Mantém últimos 100
    //       setStats(calculateStats(updated));
    //       return updated;
    //     });
    //   } catch (err) {
    //     setError(err instanceof Error ? err : new Error('Erro ao atualizar dados'));
    //   }
    // }, refetchInterval);

    // return () => clearInterval(interval); // Limpa intervalo no unmount
  }, [refetchInterval]);

  return {
    contracts,
    stats,
    isLoading,
    isLive,
    error,
  };
}
