
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/authStore';
import WelcomeModal from '@/components/WelcomeModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Users, BarChart3, Settings, MessageSquare, Vote } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { showWelcomeModal, setShowWelcomeModal } = useAuthStore();

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900">
      {user && (
        <WelcomeModal
          isOpen={showWelcomeModal}
          onClose={handleCloseWelcomeModal}
          companyName={user.companyName}
          invisiboxEmail={user.invisiboxEmail}
        />
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome back, {user?.companyName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your anonymous communication platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Polls</CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 closing soon</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Messages</span>
              </CardTitle>
              <CardDescription>
                Manage anonymous messages from your employees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/management/send-message">
                <Button className="w-full">Send Message to Employees</Button>
              </Link>
              <Link to="/management/messages">
                <Button variant="outline" className="w-full">View All Messages</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Vote className="w-5 h-5" />
                <span>Polls</span>
              </CardTitle>
              <CardDescription>
                Create and manage anonymous polls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/management/create-poll">
                <Button className="w-full">Create New Poll</Button>
              </Link>
              <Link to="/management/polls">
                <Button variant="outline" className="w-full">View All Polls</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
