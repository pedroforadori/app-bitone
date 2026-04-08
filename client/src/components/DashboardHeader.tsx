/**
 * Dashboard Header Component
 * Cabeçalho com título, descrição e indicador Live
 */

'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Moon, Sun, LogOut } from 'lucide-react';

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
  const { logout } = useAuth();

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

      <div className="flex items-center gap-3">
        {isLive && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg 
                        dark:bg-green-900/20 dark:border-green-800">
            <div
              className={`w-2 h-2 rounded-full bg-green-600 transition-opacity ${
                isBlinking ? 'opacity-100' : 'opacity-30'
              }`}
            />
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">Live</span>
          </div>
        )}

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

        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-foreground transition 
                     hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
