
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft, Eye, Lock, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

export default function AnonymityGuidePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="mb-8 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Anonymity Guide
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Understanding how InvisiBox protects your privacy
            </p>
          </div>

          {/* Guide Content */}
          <div className="space-y-8">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Lock className="w-6 h-6 mr-3 text-purple-600" />
                  How Anonymous Emails Work
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  When you subscribe to a company channel, InvisiBox generates a unique proxy email 
                  address (like <code className="bg-gray-100 px-2 py-1 rounded">emp9x83xxx@invisibox.com</code>) 
                  that becomes your anonymous identity.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Your real email is only used for the initial subscription</li>
                  <li>All future communications use your proxy email</li>
                  <li>Management never sees your real email address</li>
                  <li>The proxy email is randomly generated and unique to you</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Eye className="w-6 h-6 mr-3 text-blue-600" />
                  What Management Can See
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Management has a limited view designed to protect your privacy:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">✅ What They See</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Your proxy email (emp9x83xxx@invisibox.com)</li>
                      <li>• Messages you send</li>
                      <li>• Poll responses (aggregated)</li>
                      <li>• Message timestamps</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">❌ What They Don't See</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Your real email address</li>
                      <li>• Your real name</li>
                      <li>• Your department/role</li>
                      <li>• Any personal information</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <MessageSquare className="w-6 h-6 mr-3 text-pink-600" />
                  Communication Flow
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Initial Subscription</h4>
                      <p className="text-gray-700">You provide your real email and company channel to subscribe. InvisiBox generates your anonymous identity.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Receiving Messages</h4>
                      <p className="text-gray-700">Management sends messages/polls to all subscribers. You receive them via your real email with links to respond anonymously.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Anonymous Responses</h4>
                      <p className="text-gray-700">When you reply or vote, your response is linked to your proxy email, keeping your identity completely private.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Users className="w-6 h-6 mr-3 text-orange-600" />
                  Best Practices for Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                    <span><strong>Don't include identifying information</strong> in your messages (name, department, specific projects only you work on)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                    <span><strong>Use your proxy email consistently</strong> for all communications with management</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                    <span><strong>Keep your proxy email private</strong> - don't share it with colleagues</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                    <span><strong>Unsubscribe when leaving</strong> the company to ensure your communications stop</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to communicate anonymously?</h3>
            <p className="text-gray-700 mb-6">Join your company's channel or send an anonymous message</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/employee/subscribe">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Subscribe to Company Channel
                </Button>
              </Link>
              <Link to="/employee/send-message">
                <Button variant="outline" size="lg">
                  Send Anonymous Message
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
