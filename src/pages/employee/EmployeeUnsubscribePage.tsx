import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';

export default function EmployeeUnsubscribePage() {
  const [employeeInvisiboxEmail, setEmployeeInvisiboxEmail] = useState('');
  const [unsubscribedResponseData, setUnsubscribedResponseData] = useState(null);
  const { toast } = useToast();

  // send data to backend using tanstack mutation and axios
  const unSubscribeMutation = useMutation({
    mutationFn: async (employeeInvisiboxEmail: string) => {
      const response = await axiosInstance.post('/employees/unsubscribe', {
        employeeInvisiboxEmail,
      });
      return response.data;
    },
    onSuccess: (response) => {
      toast({
        title: "Unsubscribed successfully",
        description: "You have been removed from the anonymous communication platform.",
      });
      setEmployeeInvisiboxEmail('');
      setUnsubscribedResponseData(response); 
    },
    onError: (error: any) => {
      toast({
        title: "Unsubscribe failed",
        description: error.response?.data?.message || "An error occurred while unsubscribing.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeInvisiboxEmail) {
      toast({
        title: "Missing information",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!employeeInvisiboxEmail.includes('@')) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // unsubscribe employee
    unSubscribeMutation.mutateAsync(employeeInvisiboxEmail);
    setEmployeeInvisiboxEmail(''); // Clear the input field after submission
  }

  if (unsubscribedResponseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 flex items-center justify-center px-4 pt-3 sm:pt-9 pb-12">
        <Card className="w-full max-w-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">Unsubscription Successful!</CardTitle>
            <CardDescription>
              You've successfully unsubscribed from the anonymous communication platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-green-700 dark:text-green-300">Company:</span>
                  <span className="text-green-600 dark:text-green-400 capitalize">{unsubscribedResponseData?.companyName}</span>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <Link to="/employee/subscribe" className="text-purple-700 dark:text-purple-400 hover:underline">
                Want to subscribe to another company?
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 flex items-center justify-center px-4 pt-5 pb-12">
      <Card className="w-full max-w-xl">
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
            Remove yourself from your company's anonymous communication channel
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Your Invisibox email Address </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. emp298urjs9@invisibox.email"
                value={employeeInvisiboxEmail}
                onChange={(e) => setEmployeeInvisiboxEmail(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                This should be the invisibox email that was sent to you after subscribing to your company's invisibox channel.
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Warning:</strong> Once unsubscribed, you will no longer be able to send or receive anonymous messages or be able to participate in polls.
              </p>
            </div>
            <Button type="submit" variant="destructive" className="w-full" disabled={unSubscribeMutation.isPending}>
              {unSubscribeMutation.isPending ? 'Unsubscribing...' : 'Unsubscribe'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <Link to="/employee/subscribe" className="text-purple-700 dark:text-purple-400 hover:underline">
                Subscribe to a company channel
              </Link>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
