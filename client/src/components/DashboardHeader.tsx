/**
 * Dashboard Header Component
 * Cabeçalho com título e indicador
 */

'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface DashboardHeaderProps {
  title: string;
  description: string;
  isLive?: boolean;
}

export function DashboardHeader({
  title,
  description,
  isLive = true,
}: DashboardHeaderProps) {
  const [isBlinking, setIsBlinking] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="flex flex-col max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
      <h1 className="text-lg font-bold text-foreground mb-1">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
