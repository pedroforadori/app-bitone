/**
 * Mock Data Service
 * Simula dados reais de processamento de contratos
 */

import { Contract, ContractStatus, DashboardStats, ThroughputDataPoint } from './types';

const BANKS = ['Itaú', 'Santander', 'Bradesco', 'Caixa', 'Banco do Brasil', 'HSBC', 'Nubank'];
const CUSTOMER_NAMES = [
  'João Silva',
  'Maria Santos',
  'Carlos Oliveira',
  'Ana Costa',
  'Pedro Ferreira',
  'Juliana Martins',
  'Ricardo Alves',
  'Fernanda Gomes',
];

const ERROR_MESSAGES: Record<string, string> = {
  'ERR_001': 'Divergência na B3 - Dados não conferem',
  'ERR_004': 'Limite de crédito excedido',
  'ERR_005': 'Documento expirado',
};

/**
 * Gera um contrato mockado com status aleatório
 */
function generateContract(index: number): Contract {
  const statuses: ContractStatus[] = ['APPROVED', 'PENDING', 'REJECTED'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  const isRejected = status === 'REJECTED';
  const errorCode = isRejected ? `ERR_${String(Math.floor(Math.random() * 5) + 1).padStart(3, '0')}` : undefined;

  return {
    id: `CTR-${String(index + 1).padStart(7, '0')}`,
    bankName: BANKS[Math.floor(Math.random() * BANKS.length)],
    amount: Math.floor(Math.random() * 50000) + 10000,
    status,
    customerName: CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)],
    createdAt: new Date(Date.now() - Math.random() * 86400000), // Últimas 24h
    errorCode,
    errorMessage: errorCode ? ERROR_MESSAGES[errorCode] : undefined,
  };
}

/**
 * Gera lista de contratos mockados
 */
export function generateContracts(count: number = 50): Contract[] {
  return Array.from({ length: count }, (_, i) => generateContract(i));
}

/**
 * Calcula estatísticas do dashboard
 */
export function calculateStats(contracts: Contract[]): DashboardStats {
  const totalProcessed = contracts.length;
  const totalVolume = contracts.reduce((sum, c) => sum + c.amount, 0);
  const approved = contracts.filter(c => c.status === 'APPROVED').length;
  const successRate = totalProcessed > 0 ? (approved / totalProcessed) * 100 : 0;
  const pendingReview = contracts.filter(c => c.status === 'PENDING').length;

  return {
    totalProcessed,
    totalVolume,
    successRate: Math.round(successRate * 100) / 100,
    pendingReview,
  };
}

/**
 * Gera dados de throughput para as últimas 24 horas
 */
export function generateThroughputData(): ThroughputDataPoint[] {
  const data: ThroughputDataPoint[] = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 3600000);
    const hourString = hour.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    // Volume varia entre 150k e 500k por hora
    const volume = Math.floor(Math.random() * 350000) + 150000;
    
    data.push({
      hour: hourString,
      volume,
    });
  }

  return data;
}

/**
 * Simula atualização de dados (para polling)
 * Retorna novos contratos a cada chamada
 */
let contractCounter = 0;

export function fetchContractsWithPolling(): Contract[] {
  contractCounter += Math.floor(Math.random() * 5) + 1; // Adiciona 1-5 novos contratos
  return generateContracts(Math.min(contractCounter, 10)); // Máximo de 100 para não ficar muito pesado
}
