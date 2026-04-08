/**
 * Throughput Chart Component
 * Visualiza volume de processamento nas últimas 24 horas
 */

'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ThroughputDataPoint } from '@/lib/types';
import { generateThroughputData } from '@/lib/mock-data';
import { formatVolume } from '@/lib/format';

export function ThroughputChart() {
  const [data, setData] = useState<ThroughputDataPoint[]>([]);

  useEffect(() => {
    const initialData = generateThroughputData();
    setData(initialData);

    // Simula atualização de dados a cada 10 segundos
    const interval = setInterval(() => {
      setData(generateThroughputData());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border border-border">
          <p className="text-sm font-medium">{payload[0].payload.hour}</p>
          <p className="text-sm text-primary">
            Volume: {formatVolume(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis
          dataKey="hour"
          stroke="#94a3b8"
          style={{ fontSize: '12px' }}
          tick={{ fill: '#64748b' }}
        />
        <YAxis
          stroke="#94a3b8"
          style={{ fontSize: '12px' }}
          tick={{ fill: '#64748b' }}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="volume"
          stroke="#3b82f6"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorVolume)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
