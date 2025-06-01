
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, MessageSquare, CircleOff, Eye, Server, Database, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyProtectionPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Privacy Protection
            </span>
            <br />
            <span className="text-gray-900 dark:text-gray-100">at Its Core</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            InvisiBox is built from the ground up with privacy as the foundation. 
            Every feature, every process, and every interaction is designed to protect your anonymity completely.
          </p>
        </div>
      </section>

      {/* Core Protection Features */}
      <section className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            How We Keep You Protected
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <CircleOff className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">No Account Required</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Employees never create accounts. Just subscribe with your email. No passwords, 
                  no profiles, no persistent tracking across sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Anonymous Identity</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Each employee gets a unique proxy email (emp9x83xxx@invisibox.email) that completely 
                  masks their real identity from management.
                </p>
              </CardContent>
            </Card>

            {/* <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Secure Communication</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  All messages are encrypted in transit and at rest. Your communications are protected 
                  by enterprise-grade security measures.
                </p>
              </CardContent>
            </Card> */}

            {/* <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Zero Knowledge</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We cannot see who sends what. Even our administrators cannot link messages 
                  to real employee identities.
                </p>
              </CardContent>
            </Card> */}

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Server className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Isolated Infrastructure</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Each company's data is completely isolated. Cross-contamination or data 
                  leaks between organizations are impossible.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Minimal Data Storage</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We only store what's absolutely necessary. No browsing habits, no behavioral 
                  tracking, no unnecessary personal information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="container mx-auto px-4 py-16 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
            Technical Privacy Implementation
          </h2>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    Proxy Email System
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    When you subscribe, our system generates a unique proxy email address that acts as your anonymous identity. 
                    This email is cryptographically generated and cannot be reverse-engineered to reveal your real email address.
                  </p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <li>• Format: emp[random-string]@invisibox.email</li>
                    <li>• One-way mapping (cannot be reversed)</li>
                    <li>• Unique per company subscription</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    End-to-End Encryption
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    All communications are encrypted using industry-standard AES-256 encryption. 
                    Messages are encrypted on your device before being sent to our servers.
                  </p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <li>• AES-256 encryption for all data</li>
                    <li>• TLS 1.3 for data in transit</li>
                    <li>• Encrypted database storage</li>
                  </ul>
                </div>
              </div>
            </div> */}

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    Data Minimization
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We follow strict data minimization principles, collecting only what's absolutely 
                    necessary for the service to function. No tracking pixels, no analytics on employee behavior.
                  </p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <li>• No IP address logging for employees</li>
                    <li>• No behavioral tracking</li>
                    <li>• Automatic data purging policies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Ready to Experience True Anonymous Communication?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Join thousands of employees and companies who trust InvisiBox for their anonymous communication needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/employee/subscribe">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Subscribe as Employee
              </button>
            </Link>
            <Link to="/management/signup">
              <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-3xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                Sign Up as Management
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-800/50 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <Link to="/" className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  InvisiBox
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Privacy-first anonymous communication for modern workplaces.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
