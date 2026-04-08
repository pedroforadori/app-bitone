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
import { formatVolume } from '@/lib/format';
import { TrendingUp, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { contracts, stats, isLoading, isLive } = useContracts(5000);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <DashboardHeader
          title="BitOne Command Center"
          description="Monitoramento de liquidação e registro de contratos em tempo real."
          isLive={isLive}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Contratos Processados"
            value={stats.totalProcessed.toLocaleString('pt-BR')}
            icon={<TrendingUp className="h-8 w-8" />}
          />
          <KpiCard
            label="Volume Total"
            value={formatVolume(stats.totalVolume)}
            icon={<DollarSign className="h-8 w-8" />}
          />
          <KpiCard
            label="Taxa de Sucesso"
            value={`${stats.successRate.toFixed(1)}%`}
            icon={<CheckCircle className="h-8 w-8" />}
            trend={{
              value: 2.5,
              direction: 'up',
            }}
          />
          <KpiCard
            label="Pendentes de Revisão"
            value={stats.pendingReview}
            icon={<AlertCircle className="h-8 w-8" />}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
          {/* Throughput Chart - 2/3 width */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                Volume de Processamento (24h)
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Evolução do volume de contratos processados por hora
              </p>
            </div>
            <div className="p-6">
              <ThroughputChart />
            </div>
          </div>

          {/* Quick Actions - 1/3 width */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Ações Requeridas
            </h2>
            <div className="space-y-3">
              {stats.pendingReview > 0 ? (
                <>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-800">
                    <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
                      {stats.pendingReview} contratos pendentes
                    </p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                      Aguardando revisão manual
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                      {Math.round((stats.successRate * stats.totalProcessed) / 100)} aprovados
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      Processados com sucesso
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                  <p className="text-sm font-semibold text-green-900 dark:text-green-200">
                    ✓ Tudo em dia
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    Nenhuma ação requerida no momento
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
