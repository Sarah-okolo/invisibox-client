
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Shield, ArrowLeft } from 'lucide-react';

// Mock message data
const mockMessage = {
  id: 'msg123',
  title: 'Important Company Update',
  content: 'We are excited to announce that our company will be moving to a new office location next month. The new space will provide more meeting rooms, better amenities, and improved workspaces for everyone.\n\nPlease share your thoughts or concerns about this upcoming change.',
  date: '2023-05-15T14:30:00Z',
  tags: ['Announcement', 'Important'],
};

export default function ReplyToMessagePage() {
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoadingMessage, setIsLoadingMessage] = useState(true);
  const [message, setMessage] = useState(mockMessage);
  const { messageId } = useParams<{ messageId: string }>();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would fetch the message from an API
    setIsLoadingMessage(true);
    
    setTimeout(() => {
      setIsLoadingMessage(false);
    }, 800);
  }, [messageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reply.trim()) {
      toast({
        title: "Reply can't be empty",
        description: "Please enter your response.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Reply submitted",
        description: "Your anonymous reply has been sent.",
      });
      setSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  if (isLoadingMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading message...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container max-w-2xl mx-auto py-8">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        
        <Card>
          <CardHeader className="border-b">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm text-purple-600 font-medium">Anonymous Reply</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(message.date).toLocaleDateString()}
              </span>
            </div>
            <CardTitle>{message.title}</CardTitle>
            <CardDescription>
              From Company Management
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="whitespace-pre-line mb-8 text-gray-700">
              {message.content}
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-green-700 font-semibold text-lg mb-2">
                  Thank You for Your Response
                </h3>
                <p className="text-green-600 mb-4">
                  Your anonymous reply has been submitted successfully.
                </p>
                <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                  <p className="text-gray-700 italic">"{reply}"</p>
                </div>
                <Link to="/">
                  <Button>Return to Home</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Your Reply</h3>
                  <Textarea
                    placeholder="Write your anonymous response here..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="min-h-[150px]"
                    required
                  />
                  <div className="text-sm text-muted-foreground">
                    Your response will be completely anonymous. Management will not be able to identify you.
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    type="submit" 
                    disabled={isLoading || !reply.trim()} 
                    className="w-full"
                  >
                    {isLoading ? 'Sending...' : 'Send Anonymous Reply'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
