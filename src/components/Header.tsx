
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            InvisiBox
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {isAuthenticated && user && (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user.companyName}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-900 dark:text-gray-100"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
