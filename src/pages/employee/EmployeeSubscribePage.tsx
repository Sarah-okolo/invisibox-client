
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscribeMutation } from '@/hooks/useEmployeeMutations';
import { useToast } from '@/hooks/use-toast';

export default function EmployeeSubscribePage() {
  const [email, setEmail] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
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

    if (!companyEmail.includes('@invisibox.com')) {
      toast({
        title: "Invalid company email",
        description: "Company email must be an @invisibox.com address.",
        variant: "destructive",
      });
      return;
    }

    subscribeMutation.mutate({
      employeeEmail: email,
      companyInvisiboxEmail: companyEmail,
    }, {
      onSuccess: () => {
        setEmail('');
        setCompanyEmail('');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 flex items-center justify-center p-4 py-32">
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
                placeholder="yourcompany@invisibox.com"
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
