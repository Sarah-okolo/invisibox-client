
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft, AlertTriangle, Eye, Lock, MessageSquare, Brain, Lightbulb } from 'lucide-react';
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
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Stay Anonymous
              </span>
            </h1>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              How to Protect Your Identity on InvisiBox
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              At InvisiBox, we've designed the system to protect your anonymity, but full privacy also depends on how you use it. This guide will help you understand the simple steps to keep your messages truly anonymous.
            </p>
          </div>

          {/* Guide Content */}
          <div className="space-y-8">
            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                  1. Avoid Personal Identifiers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Even if your name and email are hidden, certain information in your message can still give you away.
                </p>
                
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">❌ Do NOT include:</h4>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    <li>• Your full name or nickname</li>
                    <li>• Email addresses or phone numbers</li>
                    <li>• Employee ID numbers</li>
                    <li>• Department names or team names</li>
                    <li>• Your job title (e.g. "Team Lead, Marketing")</li>
                    <li>• References to recent meetings or time-based events (e.g. "after the 3pm sync")</li>
                    <li>• Specific office locations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
                  2. Be Careful with How You Write
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  People can often be identified by how they write.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">To help stay anonymous:</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Avoid using slang, emojis, or inside jokes only your team knows</li>
                    <li>• Don't mention personal experiences that only a few people could recognize</li>
                    <li>• Don't use language you regularly use in company channels</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Eye className="w-6 h-6 mr-3 text-green-600" />
                  3. All Tracking Is Disabled
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">InvisiBox disables:</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Open tracking</li>
                    <li>• Link tracking</li>
                    <li>• Device metadata</li>
                  </ul>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-3">
                    This means no one — not even admins — can tell when or where your message was opened.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Brain className="w-6 h-6 mr-3 text-purple-600" />
                  4. We Don't Log Your IP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Your IP address is never stored in our systems. We also recommend using a secure connection (like VPN) for additional peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/20 dark:border-gray-700/20 rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Lightbulb className="w-6 h-6 mr-3 text-orange-600" />
                  Final Tip: If You're Not Sure, Rewrite It
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If your message contains anything that might hint at who you are, rewrite it. It's better to speak generally than to risk being identified.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Final Message */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">💡 Your voice matters. Say it safely.</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We're committed to helping you speak freely, securely, and without fear of being exposed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/employee/send-message">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-3xl">
                  Send Anonymous Message
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg" className="rounded-3xl">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
