import { useAuth } from '@/hooks/useAuth';
import { Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Header() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Don't render header on management pages (they use sidebar layout)
  if (location.pathname.startsWith('/management/') && isAuthenticated) {
    return null;
  }

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
        </div>
      </div>
    </header>
  );
}
