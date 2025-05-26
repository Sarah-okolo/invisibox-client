
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Textarea } from "@/components/ui/textarea";
import { Shield, Send, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SendAnonymousMessagePage() {
  const [step, setStep] = useState(1);
  const [anonymousEmail, setAnonymousEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const validateAnonymousEmail = async (email: string): Promise<boolean> => {
    // Simulate API call to validate anonymous email
    // This would typically validate against backend
    const isValidFormat = email.includes('@invisibox.com') && email.startsWith('emp');
    return new Promise((resolve) => {
      setTimeout(() => resolve(isValidFormat), 1000);
    });
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    try {
      const isValid = await validateAnonymousEmail(anonymousEmail);
      
      if (isValid) {
        toast({
          title: "Email verified",
          description: "You can now send an anonymous message.",
        });
        setStep(2);
      } else {
        toast({
          title: "Invalid email",
          description: "This doesn't appear to be a valid InvisiBox anonymous email.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "There was an error verifying your anonymous email.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare data for backend
      const messageData = {
        from: anonymousEmail,
        subject,
        message,
        timestamp: new Date().toISOString()
      };
      
      console.log('Anonymous message data ready for backend:', messageData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent",
        description: "Your anonymous message has been delivered to the company.",
      });
      
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <form onSubmit={handleVerify}>
      <CardContent className="space-y-4">
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
          <p className="text-xs text-muted-foreground">
            Enter the anonymous email you received when subscribing to your company's channel.
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-200 flex items-start">
          <Lock className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>
            Don't have an anonymous email yet? <Link to="/employee/subscribe" className="font-medium underline hover:text-blue-700 dark:hover:text-blue-300">Subscribe to a company</Link> first to get one.
          </p>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-sm text-purple-800 dark:text-purple-200 flex items-start">
          <Shield className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>
            Need help staying anonymous? Check out our <Link to="/anonymity-guide" className="font-medium underline hover:text-purple-700 dark:hover:text-purple-300">Anonymity Guide</Link> for best practices.
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" type="submit" disabled={isVerifying}>
          {isVerifying ? 'Verifying...' : 'Verify Anonymous Email'}
        </Button>
        <Link to="/" className="w-full">
          <Button variant="ghost" className="w-full">
            Cancel
          </Button>
        </Link>
      </CardFooter>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-muted-foreground">From: </span>
            <span className="font-medium">{anonymousEmail}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            type="button" 
            onClick={() => setStep(1)}
          >
            Change
          </Button>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input 
            id="subject"
            placeholder="Message subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea 
            id="message"
            placeholder="Write your anonymous message here..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[200px]"
            required
          />
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Important:</p>
            <p>
              While your identity is protected, please ensure your message follows company 
              communication guidelines. Avoid including personally identifying details in your message.
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          <Send className="h-4 w-4 mr-2" />
          {isSubmitting ? 'Sending...' : 'Send Anonymous Message'}
        </Button>
        <Link to="/" className="w-full">
          <Button variant="ghost" className="w-full">
            Cancel
          </Button>
        </Link>
      </CardFooter>
    </form>
  );

  const renderSuccess = () => (
    <>
      <CardContent className="space-y-6 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Message Sent Successfully!</h3>
          <p className="text-muted-foreground mb-4">
            Your anonymous message has been delivered to the company management.
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 border rounded-lg p-4 text-left">
          <p className="text-sm font-medium mb-1">Subject:</p>
          <p className="mb-3">{subject}</p>
          <p className="text-sm font-medium mb-1">Message:</p>
          <p className="whitespace-pre-line">{message}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <Link to="/">
          <Button>
            Back to Home
          </Button>
        </Link>
      </CardFooter>
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </Link>
          <CardTitle className="text-2xl font-bold">Send Anonymous Message</CardTitle>
          <CardDescription>
            Communicate with your company management while keeping your identity private.
          </CardDescription>
        </CardHeader>
        
        {submitted ? renderSuccess() : (step === 1 ? renderStep1() : renderStep2())}
      </Card>
    </div>
  );
}
