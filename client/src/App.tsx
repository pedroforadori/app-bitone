import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { MobileHeader } from "./components/MobileHeader";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Grid from "./pages/Grid";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";


function ProtectedRouter() {
  const { isAuthenticated } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileToggle={setIsMobileSidebarOpen} />
      <MobileHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        <Switch>
          <Route path={"/"} component={Dashboard} />
          <Route path={"/dashboard"} component={Dashboard} />
          <Route path={"/grid"} component={Grid} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" switchable>
          <TooltipProvider>
            <Toaster />
            <ProtectedRouter />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
