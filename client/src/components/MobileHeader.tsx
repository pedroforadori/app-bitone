'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-20 flex items-center justify-between px-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onMenuClick}
        className="p-2"
      >
        <Menu size={20} />
      </Button>

      <h1 className="text-lg font-bold text-foreground">BitOne</h1>

      <div className="w-10"></div> {/* Espaçador para centralizar o título */}
    </div>
  );
}