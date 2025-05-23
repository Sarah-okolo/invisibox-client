
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
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Anonymous
            </span>
            <br />
            <span className="text-gray-900">Communication</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Bridge the gap between employees and management with privacy-first, 
            anonymous two-way communication. No accounts needed for employees.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <Link to="/management/login">
              <Button className="w-full h-16 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Login as Management
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/employee/subscribe">
              <Button variant="outline" className="w-full h-16 text-lg border-2 hover:bg-purple-50">
                Subscribe to Company
                <Users className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/employee/send-message">
              <Button variant="outline" className="w-full h-16 text-lg border-2 hover:bg-pink-50">
                Send Anonymous Message
                <MessageSquare className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/employee/unsubscribe">
              <Button variant="ghost" className="w-full h-16 text-lg hover:bg-gray-100">
                Unsubscribe
                <Eye className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How InvisiBox Protects Your Privacy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Anonymous Identity</h3>
                <p className="text-gray-600">
                  Employees get a unique proxy email (emp9x83xxx@invisibox.com) that completely masks their real identity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">No Account Required</h3>
                <p className="text-gray-600">
                  Employees simply subscribe with their email. No password, no profile, no tracking across sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Two-Way Communication</h3>
                <p className="text-gray-600">
                  Management can send messages and polls. Employees can reply and participate anonymously.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/anonymity-guide">
              <Button variant="outline" size="lg" className="text-lg px-8">
                Learn More About Our Privacy Protection
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
