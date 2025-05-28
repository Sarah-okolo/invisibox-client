import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, CheckCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscribeMutation, SubscribeResponse } from '@/hooks/useEmployeeMutations';
import { useToast } from '@/hooks/use-toast';

export default function EmployeeSubscribePage() {
  const [email, setEmail] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<SubscribeResponse | null>(null);
  const subscribeMutation = useSubscribeMutation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !companyEmail) {
      toast({
        title: "Fields required",
        description: "Please fill in both email fields.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!companyEmail.includes('@invisibox.email')) {
      toast({
        title: "Invalid company email",
        description: "Company email must be an @invisibox.email address.",
        variant: "destructive",
      });
      return;
    }

    subscribeMutation.mutate({
      email,
      invisiboxEmail: companyEmail,
    }, {
      onSuccess: (response) => {
        setSubscriptionSuccess(response);
        setEmail('');
        setCompanyEmail('');
      }
    });
  };

  const getCompanyName = (invisiboxEmail: string) => {
    // Extract company name from invisibox email (everything before @invisibox.email)
    return invisiboxEmail.split('@')[0];
  };

  const handleStartOver = () => {
    setSubscriptionSuccess(null);
  };

  if (subscriptionSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 flex items-center justify-center p-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Link to="/" className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </Link>
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">Subscription Successful!</CardTitle>
            <CardDescription>
              You've successfully joined the anonymous communication platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-green-700 dark:text-green-300">Company:</span>
                  <span className="text-green-600 dark:text-green-400 capitalize">{getCompanyName(subscriptionSuccess.anonymousEmail)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-green-700 dark:text-green-300">InvisiBox Email:</span>
                  <span className="text-green-600 dark:text-green-400 font-mono text-xs">{subscriptionSuccess.anonymousEmail}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">Check Your Email</p>
                <p className="text-blue-600 dark:text-blue-400">
                  Your unique InvisiBox email has been sent to your registered email address. 
                  Use this email to send anonymous messages to your company.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleStartOver} 
                variant="outline" 
                className="w-full"
              >
                Subscribe Another Company
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                <Link to="/employee/send-message" className="text-purple-400 hover:underline">
                  Send an anonymous message
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 flex items-center justify-center p-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </Link>
          <CardTitle className="text-2xl font-bold">Subscribe to InvisiBox</CardTitle>
          <CardDescription>
            Join your company's anonymous communication platform
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Your Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <p className="text-xs text-orange-500">
              • Note: Your email address will never be shared with your company.
            </p>
            <div className="space-y-2">
              <Label htmlFor="companyEmail">Company InvisiBox Email</Label>
              <Input
                id="companyEmail"
                type="email"
                placeholder="yourcompany@invisibox.email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Ask your HR or management for this email address
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={subscribeMutation.isPending}>
              {subscribeMutation.isPending ? 'Subscribing...' : 'Subscribe'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <Link to="/privacy-protection" className="text-purple-400 hover:underline">
                Learn about our privacy protection
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
