import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Shield, MessageSquare, Send } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function ReplyToMessagePage() {
  const { messageId } = useParams();
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock message data
  const message = {
    id: messageId,
    title: 'Company Update: New Office Location',
    content: 'We are excited to announce that we will be moving to a new office location next month. The new space will provide better facilities and more room for our growing team.',
    sentAt: '2023-05-15T14:30:00Z',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reply.trim()) {
      toast({
        title: "Missing reply",
        description: "Please enter your reply before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const replyData = {
      messageId,
      replyContent: reply.trim(),
      timestamp: new Date().toISOString(),
    };
    
    console.log('Reply data ready for backend:', replyData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Reply sent successfully",
        description: "Your anonymous reply has been sent to the management.",
      });
      setReply('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 p-4 py-16">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="flex items-center mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            InvisiBox
          </span>
        </Link>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Original Message
              </CardTitle>
              <CardDescription>
                Sent on {new Date(message.sentAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">{message.title}</h3>
              <p className="text-muted-foreground whitespace-pre-line">{message.content}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Your Anonymous Reply
              </CardTitle>
              <CardDescription>
                Your identity will remain completely anonymous
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type your anonymous reply here..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    {reply.length}/1000 characters
                  </p>
                  <Button type="submit" disabled={isLoading || !reply.trim()}>
                    {isLoading ? 'Sending...' : 'Send Reply'}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
