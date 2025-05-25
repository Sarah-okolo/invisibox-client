
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import LandingPage from "@/pages/LandingPage";
import AnonymityGuidePage from "@/pages/AnonymityGuidePage";
import LoginPage from "@/pages/management/LoginPage";
import SignupPage from "@/pages/management/SignupPage";
import Dashboard from "@/pages/management/Dashboard";
import SendMessagePage from "@/pages/management/SendMessagePage";
import ViewMessagesPage from "@/pages/management/ViewMessagesPage";
import CreatePollPage from "@/pages/management/CreatePollPage";
import ViewPollsPage from "@/pages/management/ViewPollsPage";
import EmployeeSubscribePage from "@/pages/employee/EmployeeSubscribePage";
import EmployeeUnsubscribePage from "@/pages/employee/EmployeeUnsubscribePage";
import ReplyToMessagePage from "@/pages/employee/ReplyToMessagePage";
import VoteOnPollPage from "@/pages/employee/VoteOnPollPage";
import SendAnonymousMessagePage from "@/pages/employee/SendAnonymousMessagePage";
import NotFoundPage from "@/pages/NotFoundPage";

// Components
import ProtectedRoute from "@/components/ProtectedRoute";

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
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/anonymity-guide" element={<AnonymityGuidePage />} />
              
              {/* Management Routes */}
              <Route path="/management/login" element={<LoginPage />} />
              <Route path="/management/signup" element={<SignupPage />} />
              <Route path="/management/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/management/send-message" element={
                <ProtectedRoute>
                  <SendMessagePage />
                </ProtectedRoute>
              } />
              <Route path="/management/messages" element={
                <ProtectedRoute>
                  <ViewMessagesPage />
                </ProtectedRoute>
              } />
              <Route path="/management/create-poll" element={
                <ProtectedRoute>
                  <CreatePollPage />
                </ProtectedRoute>
              } />
              <Route path="/management/polls" element={
                <ProtectedRoute>
                  <ViewPollsPage />
                </ProtectedRoute>
              } />
              
              {/* Employee Routes */}
              <Route path="/employee/subscribe" element={<EmployeeSubscribePage />} />
              <Route path="/employee/unsubscribe" element={<EmployeeUnsubscribePage />} />
              <Route path="/employee/reply/:messageId" element={<ReplyToMessagePage />} />
              <Route path="/employee/vote/:pollId" element={<VoteOnPollPage />} />
              <Route path="/employee/send-message" element={<SendAnonymousMessagePage />} />
              
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
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
