'use client';

import { useLocation } from 'wouter';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Grid3X3, LogOut, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export function Sidebar() {
    const [, setLocation] = useLocation();
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(true);
    const { theme, toggleTheme } = useTheme();

    const handleNavigateToDashboard = () => {
        setLocation('/');
    };

    const handleNavigateToGrid = () => {
        setLocation('/');
    };

    const handleLogout = () => {
        logout();
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`fixed left-0 top-0 h-screen bg-background border-r border-border transition-all duration-300 z-40 flex flex-col ${isOpen ? 'w-64' : 'w-20'
                }`}
        >
            {/* Header do Sidebar */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <button
                    onClick={toggleSidebar}
                    className="px-3 py-1 hover:bg-accent rounded-md transition-colors"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Items do Menu */}
            <nav className="flex-1 p-4 space-y-3">
                <Button
                    variant="ghost"
                    className={`w-full transition-all ${isOpen ? 'justify-start gap-4 h-12 px-4' : 'justify-center h-12'
                        }`}
                    onClick={handleNavigateToDashboard}
                    title="Dashboard"
                >
                    <LayoutDashboard size={20} />
                    {isOpen && <span>Dashboard</span>}
                </Button>

                <Button
                    variant="ghost"
                    className={`w-full transition-all ${isOpen ? 'justify-start gap-4 h-12 px-4' : 'justify-center h-12'
                        }`}
                    onClick={handleNavigateToGrid}
                    title="Grid"
                >
                    <Grid3X3 size={20} />
                    {isOpen && <span>Grid</span>}
                </Button>
            </nav>

            {/* Logout Button */}
            <div className="flex flex-col p-4 border-t border-border">
                {toggleTheme && (
                    <Button
                        variant="ghost"
                        className={`w-4/5 hover:bg-red-50 transition-all ${isOpen ? 'justify-start gap-4 h-12 px-4' : 'justify-center h-12'}`}
                        onClick={toggleTheme}
                        title="Toggle"
                    >
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                        {isOpen && (theme === 'dark' ? 'Claro' : 'Escuro')}
                    </Button>
                )}
                <Button
                    variant="ghost"
                    className={`w-4/5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 transition-all ${isOpen ? 'justify-start gap-4 h-12 px-4' : 'justify-center h-12'}`}
                    onClick={handleLogout}
                    title="Logout"
                >
                    <LogOut size={20} />
                    {isOpen && <span>Logout</span>}
                </Button>

            </div>
        </div>
    );
}