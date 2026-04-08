/**
 * KPI Card Component
 * Exibe um indicador chave de desempenho
 */

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  className?: string;
}

export function KpiCard({ label, value, icon, trend, className = '' }: KpiCardProps) {
  return (
    <Card className={`p-6 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          
          {trend && (
            <div className={`mt-2 text-sm font-medium ${
              trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
            </div>
          )}
        </div>
        
        {icon && (
          <div className="text-muted-foreground ml-4">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
