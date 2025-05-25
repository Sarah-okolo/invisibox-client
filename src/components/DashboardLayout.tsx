
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Shield, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLogoutMutation } from '@/hooks/useAuthMutations';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardHeader() {
  const { user } = useAuth();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Link to="/management/dashboard" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              InvisiBox
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user && (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user.companyName}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="flex items-center space-x-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-900 dark:text-gray-100"
              >
                <LogOut className="w-4 h-4" />
                <span>{logoutMutation.isPending ? 'Logging out...' : 'Logout'}</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex-1">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
