import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarStateContextType {
  isOpen: boolean;
  isMobile: boolean;
}

const SidebarStateContext = createContext<SidebarStateContextType | undefined>(undefined);

interface SidebarStateProviderProps {
  children: React.ReactNode;
}

export function SidebarStateProvider({ children }: SidebarStateProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    const stored = localStorage.getItem('sidebar-open');
    return stored !== null ? JSON.parse(stored) : true;
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('sidebar-open');
      if (stored !== null) {
        setIsOpen(JSON.parse(stored));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Listen for custom events from sidebar toggle
  useEffect(() => {
    const handleSidebarToggle = (event: CustomEvent<boolean>) => {
      setIsOpen(event.detail);
    };

    window.addEventListener('sidebarToggle' as any, handleSidebarToggle as any);
    return () => window.removeEventListener('sidebarToggle' as any, handleSidebarToggle as any);
  }, []);

  return (
    <SidebarStateContext.Provider value={{ isOpen, isMobile }}>
      {children}
    </SidebarStateContext.Provider>
  );
}

export function useSidebarState() {
  const context = useContext(SidebarStateContext);
  if (!context) {
    throw new Error("useSidebarState must be used within SidebarStateProvider");
  }
  return context;
}