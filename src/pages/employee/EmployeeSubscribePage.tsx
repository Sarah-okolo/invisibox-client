
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmployeeSubscribePage() {
  const [email, setEmail] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !companyEmail) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@') || !companyEmail.includes('@invisibox.com')) {
      toast({
        title: "Invalid email format",
        description: "Please enter valid email addresses.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const subscriptionData = {
      employeeEmail: email,
      companyInvisiboxEmail: companyEmail,
    };
    
    console.log('Subscription data ready for backend:', subscriptionData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Subscription successful!",
        description: "You have been subscribed to anonymous communications.",
      });
      setEmail('');
      setCompanyEmail('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 flex items-center justify-center p-4">
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
            <div className="space-y-2">
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
            <div className="space-y-2">
              <Label htmlFor="companyEmail">Company InvisiBox Email</Label>
              <Input
                id="companyEmail"
                type="email"
                placeholder="yourcompany@invisibox.com"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Ask your HR or management for this email address
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <Link to="/anonymity-guide" className="text-purple-600 hover:underline">
                Learn about our anonymity features
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
