
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import { Shield, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axiosInstance';
import { useMutation } from '@tanstack/react-query';

interface ForgotEmailRequest {
  email: string;
  password: string;
}

interface ForgotEmailResponse {
  invisiboxEmail: string;
  companyName: string;
}

const forgotEmailAPI = {
  getInvisiboxEmail: async (data: ForgotEmailRequest): Promise<ForgotEmailResponse> => {
    const response = await axiosInstance.post('/auth/forgot-invisibox-email', data);
    return response.data;
  },
};

export default function ForgotInvisiboxEmailPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<ForgotEmailResponse | null>(null);
  const { toast } = useToast();

  const forgotEmailMutation = useMutation({
    mutationFn: (data: ForgotEmailRequest) => forgotEmailAPI.getInvisiboxEmail(data),
    onSuccess: (response: ForgotEmailResponse) => {
      setResult(response);
      toast({
        title: "InvisiBox email found",
        description: "Your InvisiBox email has been retrieved successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Unable to find email",
        description: error.response?.data?.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    forgotEmailMutation.mutate({ email, password });
  };

  const handleCopyEmail = async () => {
    if (result?.invisiboxEmail) {
      try {
        await navigator.clipboard.writeText(result.invisiboxEmail);
        toast({
          title: "Email copied!",
          description: "Your InvisiBox email has been copied to clipboard.",
        });
      } catch (error) {
        toast({
          title: "Copy failed",
          description: "Could not copy email to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 py-12 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 overflow-x-hidden">
        <Card className="w-full max-w-md overflow-hidden">
          <CardHeader className="text-center p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold break-words">InvisiBox Email Found</CardTitle>
            <CardDescription className="text-sm sm:text-base break-words">
              Here's your InvisiBox email for {result.companyName}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
                Your InvisiBox Email:
              </h4>
              <div className="flex items-center space-x-2">
                <div className="flex-1 p-2 bg-white dark:bg-slate-900 border rounded text-sm font-mono break-all">
                  {result.invisiboxEmail}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyEmail}
                  className="flex-shrink-0"
                >
                  Copy
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 p-4 sm:p-6">
            <Link to="/management/login" className="w-full">
              <Button className="w-full text-sm sm:text-base">
                Go to Login
              </Button>
            </Link>
            <div className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Use this email to log in to your management dashboard
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 overflow-x-hidden">
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader className="text-center p-4 sm:p-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold break-words">Find Your InvisiBox Email</CardTitle>
          <CardDescription className="text-sm sm:text-base break-words">
            Enter your original email and password to retrieve your InvisiBox email
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">Your Original Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
              <Input 
                id="password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-sm sm:text-base"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 p-4 sm:p-6">
            <Button className="w-full text-sm sm:text-base" type="submit" disabled={forgotEmailMutation.isPending}>
              {forgotEmailMutation.isPending ? 'Finding Email...' : 'Find My InvisiBox Email'}
            </Button>
            <div className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300 break-words">
              Remember your InvisiBox email?{' '}
              <Link to="/management/login" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                Back to Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
