/**
 * Dashboard Header Component
 * Cabeçalho com título e indicador
 */

'use client';

interface DashboardHeaderProps {
  title: string;
  description: string;
}

export function DashboardHeader({
  title,
  description,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
      <h1 className="text-lg font-bold text-foreground mb-1">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
