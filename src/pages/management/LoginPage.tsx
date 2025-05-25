
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Shield } from 'lucide-react';
import { useLoginMutation, useResetPasswordMutation } from '@/hooks/useAuthMutations';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  
  const loginMutation = useLoginMutation();
  const resetPasswordMutation = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ invisiboxEmail:email, password });
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    resetPasswordMutation.mutate(
      { email: resetEmail },
      {
        onSuccess: () => {
          setShowForgotPassword(false);
          setResetEmail('');
        },
      }
    );
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 py-12 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 overflow-x-hidden">
        <Card className="w-full max-w-md overflow-hidden">
          <CardHeader className="text-center p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold break-words">Reset Password</CardTitle>
            <CardDescription className="text-sm sm:text-base break-words">
              Enter your InvisiBox email address and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleForgotPassword}>
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-sm sm:text-base">InvisiBox Email</Label>
                <Input 
                  id="reset-email"
                  type="email" 
                  placeholder="yourcompany@invisibox.com" 
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 p-4 sm:p-6">
              <Button className="w-full text-sm sm:text-base" type="submit" disabled={resetPasswordMutation.isPending}>
                {resetPasswordMutation.isPending ? 'Sending...' : 'Send Reset Link'}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-sm sm:text-base" 
                type="button"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </Button>
            </CardFooter>
          </form>
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
          <CardTitle className="text-xl sm:text-2xl font-bold break-words">Management Login</CardTitle>
          <CardDescription className="text-sm sm:text-base break-words">
            Enter your InvisiBox email and password to access your company dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">InvisiBox Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="yourcompany@invisibox.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
                <Button 
                  variant="link" 
                  className="text-xs sm:text-xs p-0 h-auto" 
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                >
                  <span className="truncate">Forgot password?</span>
                </Button>
              </div>
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
            <Button className="w-full text-sm sm:text-base" type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300 break-words">
              Don't have an account?{' '}
              <Link to="/management/signup" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                Sign up here
              </Link>
              <br />
              <Link to="/management/forgot-invisibox-email" className="text-purple-600 dark:text-purple-400 hover:underline font-medium text-xs">
                Forgot your InvisiBox email?
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
