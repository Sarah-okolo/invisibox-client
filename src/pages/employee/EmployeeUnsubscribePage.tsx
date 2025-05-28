import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmployeeUnsubscribePage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Missing information",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const unsubscribeData = {
      employeeEmail: email,
    };
    
    console.log('Unsubscribe data ready for backend:', unsubscribeData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Unsubscribed successfully",
        description: "You have been removed from the anonymous communication platform.",
      });
      setEmail('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 flex items-center justify-center p-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </Link>
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            Unsubscribe from InvisiBox
          </CardTitle>
          <CardDescription>
            Remove yourself from your company's anonymous communication platform
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
              <p className="text-xs text-muted-foreground">
                This should be the email you used to subscribe
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Warning:</strong> Once unsubscribed, you will no longer receive anonymous messages or be able to participate in polls.
              </p>
            </div>
            <Button type="submit" variant="destructive" className="w-full" disabled={isLoading}>
              {isLoading ? 'Unsubscribing...' : 'Unsubscribe'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <Link to="/employee/subscribe" className="text-purple-600 hover:underline">
                Want to subscribe instead?
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
