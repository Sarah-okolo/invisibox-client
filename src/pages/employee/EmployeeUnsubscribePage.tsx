
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEmployee } from '@/contexts/EmployeeContext';
import { useToast } from '@/hooks/use-toast';
import { Shield, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmployeeUnsubscribePage() {
  const [email, setEmail] = useState('');
  const [companyChannel, setCompanyChannel] = useState('');
  const [anonymousEmail, setAnonymousEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);
  const { unsubscribe } = useEmployee();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await unsubscribe(email, companyChannel, anonymousEmail);
      setUnsubscribed(true);
      toast({
        title: "Successfully unsubscribed",
        description: "You have been unsubscribed from the company channel.",
      });
    } catch (error) {
      toast({
        title: "Unsubscribe failed",
        description: "There was an error processing your request. Please verify your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Unsubscribe from Company Channel</CardTitle>
          <CardDescription>
            Remove yourself from receiving anonymous communications.
          </CardDescription>
        </CardHeader>
        
        {unsubscribed ? (
          <>
            <CardContent className="space-y-6 text-center">
              <div className="mb-4">
                <div className="text-green-600 font-semibold text-lg mb-2">
                  Successfully Unsubscribed
                </div>
                <p className="text-gray-600">
                  You will no longer receive communications from this company channel.
                </p>
              </div>
              
              <div className="bg-gray-50 border rounded-lg p-6">
                <p className="text-center text-gray-600">
                  Your anonymized email address has been deactivated.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/" className="w-full">
                <Button className="w-full">
                  Back to Home
                </Button>
              </Link>
            </CardFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company-channel">Company Channel</Label>
                <Input 
                  id="company-channel"
                  type="text" 
                  placeholder="company-name" 
                  value={companyChannel}
                  onChange={(e) => setCompanyChannel(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="anonymous-email">Your Anonymous Email</Label>
                <Input 
                  id="anonymous-email"
                  type="email" 
                  placeholder="empXXXXXX@invisibox.com" 
                  value={anonymousEmail}
                  onChange={(e) => setAnonymousEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p>
                    This action is permanent. Once you unsubscribe, your anonymous email will be deactivated 
                    and you will stop receiving all communications.
                  </p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" variant="destructive" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Unsubscribe'}
              </Button>
              <Link to="/" className="w-full">
                <Button variant="ghost" className="w-full">
                  Cancel
                </Button>
              </Link>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
