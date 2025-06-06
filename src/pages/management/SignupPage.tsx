
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';
import { useSignupMutation } from '@/hooks/useAuthMutations';

export default function SignupPage() {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();
  const signupMutation = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (email.includes('@invisibox.email')) {
      toast({
        title: "Invalid Email",
        description: "Please use a different email address that is not from InvisiBox.",
        variant: "destructive",
      });
      return;
    }
    
    signupMutation.mutate({
      companyName,
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-3 sm:pt-9 pb-12 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 overflow-x-hidden">
      <Card className="w-full max-w-xl overflow-hidden">
        <CardHeader className="text-center p-4 sm:p-6">
          <Link to="/" className="flex justify-center mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </Link>
          <CardTitle className="text-xl sm:text-2xl font-bold break-words">Create Management Account</CardTitle>
          <CardDescription className="text-sm sm:text-base break-words">
            Sign up for a company management account on InvisiBox
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm sm:text-base">Company Name</Label>
              <Input 
                id="company"
                type="text" 
                placeholder="ACME Corporation" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm sm:text-base">Confirm Password</Label>
              <Input 
                id="confirmPassword"
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="text-sm sm:text-base"
              />
            </div>
          </CardContent>
          <CardFooter className="p-4 sm:p-6 space-y-4 flex flex-col">
            <Button className="w-full text-sm sm:text-base" type="submit" disabled={signupMutation.isPending}>
              {signupMutation.isPending ? 'Creating Account...' : 'Create Account'}
            </Button>
            <div className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300 break-words">
              Already have an account?{' '}
              <Link to="/management/login" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
                Login here
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
