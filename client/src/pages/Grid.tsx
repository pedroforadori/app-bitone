/**
 * Dashboard Page
 * Página principal com todos os componentes do Command Center
 */

'use client';

import { useContracts } from '@/hooks/useContracts';
import { DashboardHeader } from '@/components/DashboardHeader';
import { KpiCard } from '@/components/KpiCard';
import { ThroughputChart } from '@/components/ThroughputChart';
import { ContractsTable } from '@/components/ContractsTable';
import { formatVolume, formatCurrency } from '@/lib/format';
import { TrendingUp, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

export default function Grid() {
    const { contracts, stats, isLoading, isLive } = useContracts(5000);

    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <DashboardHeader
                    title="Últimos Contratos"
                    description="Clique em um contrato para visualizar detalhes completos"
                    isLive={isLive}
                />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                {/* Contracts Table */}
                <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                    <ContractsTable contracts={contracts} isLoading={isLoading} />
                </div>
            </div>
        </main>
    );
}
