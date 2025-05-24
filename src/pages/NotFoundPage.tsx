
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 overflow-x-hidden">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
          <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4 break-words">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base break-words">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm sm:text-base px-4 sm:px-6">
            <ArrowLeft className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">Back to Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
