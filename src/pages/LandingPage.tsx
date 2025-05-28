
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, MessageSquare, Users, CircleOff, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-16 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight break-words">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Anonymous
            </span>
            <br />
            <span className="text-gray-900 dark:text-gray-100">Communication</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            Bridge the gap between employees and management with privacy-first, 
            anonymous two-way communication. No accounts needed for employees.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-lg mx-auto px-2">
            <Link to="/management/login" className="block w-full">
              <Button className="w-full h-14 sm:h-16 text-base sm:text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-3xl">
                <span className="truncate">For Management</span>
                <Users className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0" />
              </Button>
            </Link>
            
            <Link to="/employee/send-message" className="block w-full">
              <Button variant="outline" className="w-full h-14 sm:h-16 text-base sm:text-lg border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-3xl">
                <span className="truncate">For Employees</span>
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-8 sm:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-gray-100 px-2 break-words">
            How InvisiBox Protects Your Privacy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <CircleOff className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100 break-words">No Account Required</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                  Employees simply subscribe with their email. No password, no profile, no tracking across sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100 break-words">Anonymous Identity</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                  Employees get a unique proxy email (emp9x83xxx@invisibox.email) that completely masks their real identity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100 break-words">Two-Way Communication</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                  Management can send messages and polls. Employees can reply and participate anonymously.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center px-2">
            <Link to="/privacy-protection">
              <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 rounded-3xl">
                <span className="hidden sm:inline">Learn More About Our Privacy Protection</span>
                <span className="sm:hidden">Privacy Guide</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-800/50 mt-8 sm:mt-16 overflow-hidden">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Brand */}
              <div className="space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                    InvisiBox
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed break-words">
                  Privacy-first anonymous communication for modern workplaces.
                </p>
              </div>

              {/* For Employees */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">For Employees</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <li>
                    <Link to="/employee/send-message" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors break-words">
                      Send Anonymous Message
                    </Link>
                  </li>
                  <li>
                    <Link to="/employee/subscribe" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors break-words">
                      Subscribe to Company
                    </Link>
                  </li>
                  <li>
                    <Link to="/employee/unsubscribe" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors break-words">
                      Unsubscribe
                    </Link>
                  </li>
                </ul>
              </div>

              {/* For Management */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">For Management</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <li>
                    <Link to="/management/login" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors break-words">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/management/signup" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors break-words">
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link to="/management/dashboard" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors break-words">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Privacy */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">Privacy</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <li>
                    <Link to="/privacy-protection" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors break-words">
                      Privacy Protection
                    </Link>
                  </li>
                  <li>
                    <Link to="/anonymity-guide" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors break-words">
                      Anonymity Guide
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors break-words">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors break-words">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 break-words px-2">
                © 2024 InvisiBox. All rights reserved. Built for workplace transparency and trust.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
