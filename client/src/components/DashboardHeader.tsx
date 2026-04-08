/**
 * Dashboard Header Component
 * Cabeçalho com título e indicador
 */

'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

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
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* <div className="flex items-center gap-3">
        {toggleTheme && (
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-foreground transition 
                       hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        )}
      </div> */}
    </div>
  );
}
