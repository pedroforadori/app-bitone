'use client';

import { useLocation } from 'wouter';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Grid3X3, LogOut, Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Separator } from './ui/separator';

interface SidebarProps {
    isMobileOpen?: boolean;
    onMobileToggle?: (isOpen: boolean) => void;
}

export function Sidebar({ isMobileOpen = false, onMobileToggle }: SidebarProps) {
    const [location, setLocation] = useLocation();
    const { logout } = useAuth();
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(() => {
        if (typeof window === 'undefined') {
            return true;
        }
        const stored = localStorage.getItem('sidebar-open');
        return stored !== null ? JSON.parse(stored) : true;
    });
    const { theme, toggleTheme } = useTheme();

    const isActive = (path: string) => {
        if (path === '/dashboard') {
            return location === '/' || location === '/dashboard';
        }
        return location === path;
    };

    const getMenuClass = (path: string) => {
        const base = isOpen ? 'justify-start gap-4 h-12 px-4' : 'justify-center h-12';
        const active = isActive(path) ? 'text-primary text-foreground font-bold bg-gray-200 hover:bg-gray-200 dark:bg-accent/30' : 'hover:bg-gray-200 dark:hover:bg-accent/20';
        return `w-full transition-all ${base} ${active}`;
    };

    // Detectar se é mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    // Em mobile, sidebar segue o estado mobile; em desktop, usa preferência persistida
    useEffect(() => {
        if (isMobile) {
            setIsOpen(isMobileOpen);
        } else {
            const stored = localStorage.getItem('sidebar-open');
            setIsOpen(stored !== null ? JSON.parse(stored) : true);
        }
    }, [isMobile, isMobileOpen]);

    const handleNavigateToDashboard = () => {
        setLocation('/dashboard');
        if (isMobile && onMobileToggle) {
            onMobileToggle(false);
        }
    };

    const handleNavigateToGrid = () => {
        setLocation('/grid');
        if (isMobile && onMobileToggle) {
            onMobileToggle(false);
        }
    };

    const handleLogout = () => {
        logout();
        if (isMobile && onMobileToggle) {
            onMobileToggle(false);
        }
    };

    const toggleSidebar = () => {
        if (isMobile && onMobileToggle) {
            onMobileToggle(!isOpen);
        } else {
            const nextOpen = !isOpen;
            setIsOpen(nextOpen);
            localStorage.setItem('sidebar-open', JSON.stringify(nextOpen));
        }
    };

    return (
        <>
            {/* Overlay para mobile */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={() => onMobileToggle && onMobileToggle(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-screen bg-background border-r border-border transition-all duration-300 z-40 flex flex-col overflow-y-auto pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] ${isMobile
                        ? (isOpen ? 'w-44 translate-x-0' : 'w-52 -translate-x-full')
                        : (isOpen ? 'w-44' : 'w-12')
                    }`}
            >
                {/* Header do Sidebar */}
                <div className="flex items-center justify-between px-2.5 py-2 border-b border-border">
                    {isOpen && !isMobile && <h1 className="text-lg font-bold text-foreground">Menu</h1>}
                    {isMobile && isOpen && <h1 className="text-lg font-bold text-foreground">Menu</h1>}
                    {!isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors dark:hover:bg-accent/40"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    )}
                    {isMobile && isOpen && (
                        <button
                            onClick={toggleSidebar}
                            className="p-1 hover:bg-accent rounded-md transition-colors"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Items do Menu */}
                <nav className="flex-1 px-3 py-2 space-y-3">
                    <Button
                        variant="ghost"
                        className={getMenuClass('/dashboard')}
                        onClick={handleNavigateToDashboard}
                        title="Dashboard"
                    >
                        <LayoutDashboard size={20} />
                        {isOpen && <span>Dashboard</span>}
                    </Button>

                    <Button
                        variant="ghost"
                        className={getMenuClass('/grid')}
                        onClick={handleNavigateToGrid}
                        title="Grid"
                    >
                        <Grid3X3 size={20} />
                        {isOpen && <span>Contratos</span>}
                    </Button>
                </nav>

                {/* Logout Button */}
                <div className="flex flex-col p-4 border-t border-border">
                    {toggleTheme && (
                        <Button
                            variant="ghost"
                            className={`w-full hover:bg-accent transition-all ${isOpen ? 'justify-start gap-4 h-12 px-4' : 'justify-center h-12'
                                }`}
                            onClick={toggleTheme}
                            title="Alternar tema"
                        >
                            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                            {isOpen && (theme === 'dark' ? 'Claro' : 'Escuro')}
                        </Button>
                    )}
                    <Separator className="my-2" />
                    <Button
                        variant="ghost"
                        className={`w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 transition-all ${isOpen ? 'justify-start gap-4 h-12 px-4' : 'justify-center h-12'
                            }`}
                        onClick={handleLogout}
                        title="Logout"
                    >
                        <LogOut size={20} />
                        {isOpen && <span>Logout</span>}
                    </Button>
                </div>
            </div>
        </>
    );
}