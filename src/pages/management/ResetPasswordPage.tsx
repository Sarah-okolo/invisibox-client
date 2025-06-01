
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useSearchParams } from 'react-router-dom';
import { Shield, CheckCircle } from 'lucide-react';
import { useResetPasswordConfirmMutation } from '@/hooks/useAuthMutations';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetData, setResetData] = useState<{ companyName: string; invisiboxEmail: string } | null>(null);
  
  const resetPasswordConfirmMutation = useResetPasswordConfirmMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      return; // Passwords don't match - could add error handling here
    }

    if (!token) {
      return; // No token - could add error handling here
    }

    console.log('Resetting password with token:', token, 'and new password:', newPassword);

    resetPasswordConfirmMutation.mutate(
      { token, newPassword },
      {
        onSuccess: (response) => {
          setResetData(response);
          setResetSuccess(true);
        },
      }
    );
  };

  if (resetSuccess && resetData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-3 sm:pt-9 pb-12 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 overflow-x-hidden">
        <Card className="w-full max-w-xl overflow-hidden">
          <CardHeader className="text-center p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold break-words">Password Reset Successful</CardTitle>
            <CardDescription className="text-sm sm:text-base break-words">
              The password for your management account {resetData.companyName} has been reset successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Your management InvisiBox email remains:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100 break-all">
                {resetData.invisiboxEmail}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 p-4 sm:p-6">
            <Link to="/management/login" className="w-full">
              <Button className="w-full text-sm sm:text-base">
                Go to Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-3 sm:pt-9 pb-12 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 overflow-x-hidden">
        <Card className="w-full max-w-xl overflow-hidden">
          <CardHeader className="text-center p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-600 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold break-words">Invalid Reset Link</CardTitle>
            <CardDescription className="text-sm sm:text-base break-words">
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-4 p-4 sm:p-6">
            <Link to="/management/login" className="w-full">
              <Button className="w-full text-sm sm:text-base">
                Back to Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-3 sm:pt-9 pb-12 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 overflow-x-hidden">
      <Card className="w-full max-w-xl overflow-hidden">
        <CardHeader className="text-center p-4 sm:p-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold break-words">Create New Password</CardTitle>
          <CardDescription className="text-sm sm:text-base break-words">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-sm sm:text-base">New Password</Label>
              <Input 
                id="new-password"
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm sm:text-base">Confirm New Password</Label>
              <Input 
                id="confirm-password"
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="text-sm sm:text-base"
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  Passwords do not match
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 p-4 sm:p-6">
            <Button 
              className="w-full text-sm sm:text-base" 
              type="submit" 
              disabled={resetPasswordConfirmMutation.isPending || newPassword !== confirmPassword || !newPassword || !confirmPassword}
            >
              {resetPasswordConfirmMutation.isPending ? 'Resetting Password...' : 'Reset Password'}
            </Button>
            <Link to="/management/login" className="w-full">
              <Button variant="ghost" className="w-full text-sm sm:text-base">
                Back to Login
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
