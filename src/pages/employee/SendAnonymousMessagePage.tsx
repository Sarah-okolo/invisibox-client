import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Send, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useVerifyAnonymousEmailMutation, useSendAnonymousMessageMutation } from '@/hooks/useEmployeeMutations';
import { useToast } from '@/hooks/use-toast';
// url search params
// import { useSearchParams } from 'react-router-dom';
// import { useEffect } from 'react';

export default function SendAnonymousMessagePage() {
  const [step, setStep] = useState(1);
  const [anonymousEmail, setAnonymousEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [verifyResponseData, setVerifyResponseData] = useState(null);
  const [sendMessageResponseData, setSendMessageResponseData] = useState(null);
  const { toast } = useToast();
  // const [searchParams] = useSearchParams();
  // const [paramDetails, setParamDetails] = useState({
  //   to: '',
  //   subject: ''
  // });
  
  const verifyEmailMutation = useVerifyAnonymousEmailMutation();
  const sendMessageMutation = useSendAnonymousMessageMutation();

  // Check if from, to, and subject are provided in URL search params (if the request is initiated from the link in the email)
  // useEffect(() => {
  //   const senderFromParams = searchParams.get('from');
  //   const receiverFromParams = searchParams.get('to');
  //   const subjectFromParams = searchParams.get('subject');

  //   if (senderFromParams && receiverFromParams && subjectFromParams) {
  //     setStep(2); // Skip to step 2 if provided
  //     setParamDetails({ // Set the parameters from URL
  //       to: senderFromParams,
  //       subject: subjectFromParams
  //     });
  //     setAnonymousEmail(receiverFromParams); // Pre-fill the anonymous email field
  //     setSubject(subjectFromParams); // pre-fill subject field
  //   }
  // }, [searchParams]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!anonymousEmail) {
      toast({
        title: "Email required",
        description: "Please enter your anonymous email address.",
        variant: "destructive",
      });
      return;
    }

  await verifyEmailMutation.mutateAsync({
      employeeInvisiboxEmail: anonymousEmail
    }, {
      onSuccess: (response) => {
        if (response.isValid) {
          setVerifyResponseData(response);
          setStep(2);
        }
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !message) {
      toast({
        title: "Fields required",
        description: "Please fill in both subject and message.",
        variant: "destructive",
      });
      return;
    }

    sendMessageMutation.mutateAsync({
      from: anonymousEmail,
      subject,
      message,
    }, {
      onSuccess: (response) => {
        setSubmitted(true);
        console.log('Message sent response data:', response);
        setSendMessageResponseData(response);
      }
    });
  };

  const renderStep1 = () => (
    <form onSubmit={handleVerify}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="anonymous-email">Your Anonymous Email</Label>
          <Input 
            id="anonymous-email"
            type="email" 
            placeholder="empXXXXXX@invisibox.email" 
            value={anonymousEmail}
            onChange={(e) => setAnonymousEmail(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            Enter the anonymous email address you received after subscribing to your company's channel.
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-200 flex items-start">
          <Lock className="h-5 w-5 mr-2 flex-shrink-0" />
          <p className='text-pretty'>
            Don't have an anonymous email yet? <Link to="/employee/subscribe" className="font-medium underline hover:text-blue-700 dark:hover:text-blue-300">Subscribe to a company</Link> first to get one.
          </p>
        </div>
        
        <div className="pt-4 p-2 text-sm text-purple-800 dark:text-purple-200 flex items-center justify-center">
          <Shield className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>
           <Link to="/privacy-protection" className="font-medium underline hover:text-purple-700 dark:hover:text-purple-300"> How we keep you protected</Link>
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" type="submit" disabled={verifyEmailMutation.isPending}>
          {verifyEmailMutation.isPending ? 'Verifying...' : 'Verify Anonymous Email'}
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
      <div className="text-sm ml-6">
        <span className="text-muted-foreground font-bold">To: </span>
        <span className="font-medium rounded-full mb-1 px-3 bg-orange-200 text-gray-800">{verifyResponseData?.companyInvisiboxEmail}</span>
      </div>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-muted-foreground font-bold">From: </span>
            <span className="font-medium rounded-full px-3 bg-purple-200 text-gray-800">{anonymousEmail}</span>
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
            className='py-6'
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
            className="min-h-[200px] py-4 resize-none"
            required
          />
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-200 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Important:</p>
            <p>
              While your identity is protected, check out our <Link to="/anonymity-guide" className="font-medium hover:underline text-purple-700 dark:text-purple-300">Anonymity Guide</Link> for best practices.
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" type="submit" disabled={sendMessageMutation.isPending}>
          <Send className="h-4 w-4 mr-2" />
          {sendMessageMutation.isPending ? 'Sending...' : 'Send Anonymous Message'}
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
      <CardContent className="space-y-6 text-center mt-6 mb-3">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Message Sent Successfully!</h3>
          <p className="text-muted-foreground mb-4">
            Your anonymous message has been delivered to {sendMessageResponseData?.companyName}'s' management.
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 border rounded-lg p-4 text-left">
          <p className="text-base font-medium mb-1">Subject:</p>
          <p className="mb-3 text-muted-foreground text-sm">{subject}</p>
          <p className="text-base font-medium mb-1">Message:</p>
          <p className="whitespace-pre-line text-muted-foreground text-sm">{message}</p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-sm text-green-800 dark:text-green-200 flex items-start font-medium">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>Replies are sent to your subscribed email inbox once the management responds to your message.</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <Link to="/">
          <Button>
            Back to Home
          </Button>
        </Link>
        <Button variant="outline" className='ml-4 rounded-lg py-5 border-purple-400' onClick={() => {
          setSubmitted(false); 
          setStep(2)
          setSubject('');
          setMessage('');
        }}>
          Send Another Message
        </Button>
      </CardFooter>
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-9 pb-12 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900">
      <Card className="w-full max-w-xl">
        {!submitted && (
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
        )}
        
        
        {submitted ? renderSuccess() : (step === 1 ? renderStep1() : renderStep2())}
      </Card>
    </div>
  );
}
