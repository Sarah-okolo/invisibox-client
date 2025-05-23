
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEmployee } from '@/contexts/EmployeeContext';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmployeeSubscribePage() {
  const [email, setEmail] = useState('');
  const [companyChannel, setCompanyChannel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [anonymousEmail, setAnonymousEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const { subscribe } = useEmployee();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const generatedEmail = await subscribe(email, companyChannel);
      setAnonymousEmail(generatedEmail);
      toast({
        title: "Successfully subscribed",
        description: "You've been subscribed to the company channel.",
      });
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(anonymousEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Copied to clipboard",
      description: "Your anonymous email has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Subscribe to Company Channel</CardTitle>
          <CardDescription>
            Get anonymous access to your company's channel. Your real identity will be protected.
          </CardDescription>
        </CardHeader>
        
        {anonymousEmail ? (
          <>
            <CardContent className="space-y-6">
              <div className="text-center mb-4">
                <div className="text-green-600 font-semibold text-lg mb-2">
                  Successfully Subscribed!
                </div>
                <p className="text-gray-600 mb-4">
                  Here is your anonymous email address:
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 border rounded-lg">
                <p className="text-center font-mono text-md break-all select-all">
                  {anonymousEmail}
                </p>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                <p className="font-medium mb-2">Important:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Save this email address for future communications.</li>
                  <li>You'll need it to send messages and vote on polls.</li>
                  <li>Keep it private to preserve your anonymity.</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full" 
                onClick={copyToClipboard}
                variant="outline"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Anonymous Email
                  </>
                )}
              </Button>
              <Link to="/" className="w-full">
                <Button variant="secondary" className="w-full">
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
                <p className="text-xs text-muted-foreground">
                  This is only used to manage your subscription and will never be shared with the company.
                </p>
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
                <p className="text-xs text-muted-foreground">
                  Enter the exact channel name provided by your company.
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Subscribe Anonymously'}
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
