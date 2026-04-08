/**
 * Domain Types - Independente de Framework
 * Representa a estrutura de dados do negócio
 */

export type ContractStatus = 'APPROVED' | 'PENDING' | 'REJECTED';

export interface Contract {
  id: string;
  bankName: string;
  amount: number;
  status: ContractStatus;
  customerName: string;
  createdAt: Date;
  errorCode?: string;
  errorMessage?: string;
}

export interface DashboardStats {
  totalProcessed: number;
  totalVolume: number;
  successRate: number;
  pendingReview: number;
}

export interface ThroughputDataPoint {
  hour: string;
  volume: number;
}
