
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, MessageSquare, Users, Eye, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Anonymous
            </span>
            <br />
            <span className="text-gray-900 dark:text-gray-100">Communication</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Bridge the gap between employees and management with privacy-first, 
            anonymous two-way communication. No accounts needed for employees.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-lg mx-auto">
            <Link to="/management/login">
              <Button className="w-full h-16 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-3xl">
                For Management
                <Users className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/employee/send-message">
              <Button variant="outline" className="w-full h-16 text-lg border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-3xl">
                For Employees
                <MessageSquare className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            How InvisiBox Protects Your Privacy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Anonymous Identity</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Employees get a unique proxy email (emp9x83xxx@invisibox.com) that completely masks their real identity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">No Account Required</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Employees simply subscribe with their email. No password, no profile, no tracking across sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Two-Way Communication</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Management can send messages and polls. Employees can reply and participate anonymously.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/anonymity-guide">
              <Button variant="outline" size="lg" className="text-lg px-8 rounded-3xl">
                Learn More About Our Privacy Protection
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-800/50 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    InvisiBox
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Privacy-first anonymous communication for modern workplaces.
                </p>
              </div>

              {/* For Employees */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">For Employees</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>
                    <Link to="/employee/send-message" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Send Anonymous Message
                    </Link>
                  </li>
                  <li>
                    <Link to="/employee/subscribe" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Subscribe to Company
                    </Link>
                  </li>
                  <li>
                    <Link to="/employee/unsubscribe" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Unsubscribe
                    </Link>
                  </li>
                </ul>
              </div>

              {/* For Management */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">For Management</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>
                    <Link to="/management/login" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/management/signup" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link to="/management/dashboard" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Privacy */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Privacy</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>
                    <Link to="/anonymity-guide" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Anonymity Guide
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                © 2024 InvisiBox. All rights reserved. Built for workplace transparency and trust.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
