import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import LandingPage from "@/pages/LandingPage";
import AnonymityGuidePage from "@/pages/AnonymityGuidePage";
import PrivacyProtectionPage from "@/pages/PrivacyProtectionPage";
import LoginPage from "@/pages/management/LoginPage";
import SignupPage from "@/pages/management/SignupPage";
import ResetPasswordPage from "@/pages/management/ResetPasswordPage";
import Dashboard from "@/pages/management/Dashboard";
import SendMessagePage from "@/pages/management/SendMessagePage";
import ViewMessagesPage from "@/pages/management/ViewMessagesPage";
import CreatePollPage from "@/pages/management/CreatePollPage";
import ViewPollsPage from "@/pages/management/ViewPollsPage";
import SettingsPage from "@/pages/management/SettingsPage";
import ManageSubscribersPage from "@/pages/management/ManageSubscribersPage";
import EmployeeSubscribePage from "@/pages/employee/EmployeeSubscribePage";
import EmployeeUnsubscribePage from "@/pages/employee/EmployeeUnsubscribePage";
import VoteOnPollPage from "@/pages/employee/VoteOnPollPage";
import SendAnonymousMessagePage from "@/pages/employee/SendAnonymousMessagePage";
import NotFoundPage from "@/pages/NotFoundPage";
import PublicVoteOnPollPage from "@/pages/employee/PublicVoteOnPollPage";
// Components
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Header from "@/components/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});


const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900">
             <Header />
             
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/anonymity-guide" element={<AnonymityGuidePage />} />
              <Route path="/privacy-protection" element={<PrivacyProtectionPage />} />
              
              {/* Management Routes */}
              <Route path="/management/login" element={<LoginPage />} />
              <Route path="/management/signup" element={<SignupPage />} />
              <Route path="/management/reset-password" element={<ResetPasswordPage />} />
              <Route path="/management/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/management/send-message" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <SendMessagePage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/management/messages" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ViewMessagesPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/management/create-poll" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CreatePollPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/management/polls" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ViewPollsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/management/settings" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <SettingsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/management/subscribers" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ManageSubscribersPage />
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              
              {/* Employee Routes */}
              <Route path="/employee/subscribe" element={<EmployeeSubscribePage />} />
              <Route path="/employee/unsubscribe" element={<EmployeeUnsubscribePage />} />
              <Route path="/employee/vote/:pollId" element={<VoteOnPollPage />} />
              <Route path="/employee/send-message" element={<SendAnonymousMessagePage />} />
              
              {/* Public Poll Voting Route */}
              <Route path="/vote/:pollId" element={<PublicVoteOnPollPage />} />
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
