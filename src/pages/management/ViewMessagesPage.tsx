
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge'; // MVP v2 feature - commented out
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquare, Clock, ArrowLeft } from 'lucide-react';
// MVP v2 features - commented out for now
// import { Tag, ThumbsUp } from 'lucide-react';
import { useMessagesQuery } from '@/hooks/useMessagesQuery';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  companyId: string;
  title: string;
  content: string;
  createdAt: string;
  replies: Reply[];
  // MVP v2 features - commented out for now
  // tags?: string[];
}

interface Reply {
  id: string;
  employeeInvisiboxEmail: string;
  content: string;
}

interface MessageCardProps {
  message: Message;
  onSelect: (message: Message) => void;
}

function MessageCard({ message, onSelect }: MessageCardProps) {
  return (
    <Card 
      className="mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onSelect(message)}
    >
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{message.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{message.content}</p>
        
        <div className="flex justify-between items-center">
          {/* MVP v2 features - commented out for now */}
          {/* <div className="flex flex-wrap gap-2">
            {message.tags?.map((tag, idx) => (
              <Badge key={idx} variant="outline">{tag}</Badge>
            ))}
          </div> */}
          <div></div>
          
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{message.replies?.length || 0}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MessageCardSkeleton() {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex justify-between items-center">
          <div></div>
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ViewMessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { data: messages = [], isLoading, error } = useMessagesQuery();
  const { toast } = useToast();
  
  // Handle error state with useEffect to avoid calling toast during render
  useEffect(() => {
    if (error) {
      toast({
        description: "There was an issue fetching your messages. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (messages) {
      console.log("Messages fetched:", messages);
    }
  }, [messages]);

  // Show selected message view
  if (selectedMessage) {
    return (
      <div className="container mx-auto p-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedMessage(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Messages
          </Button>
        </div>

        <Card>
          <CardHeader className="border-b">
            <div className="flex justify-between items-start">
              <CardTitle>{selectedMessage.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(selectedMessage.createdAt), { addSuffix: true })}
              </div>
            </div>
            {/* MVP v2 features - commented out for now */}
            {/* <div className="flex flex-wrap gap-2 mt-2">
              {selectedMessage.tags?.map((tag, idx) => (
                <Badge key={idx} variant="outline">{tag}</Badge>
              ))}
            </div> */}
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="mb-8 whitespace-pre-line">
              {selectedMessage.content}
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-semibold flex items-center mb-6">
                <MessageSquare className="w-5 h-5 mr-2" />
                Replies ({selectedMessage.replies?.length || 0})
              </h3>
              
              {!selectedMessage.replies || selectedMessage.replies.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No replies yet
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedMessage.replies.map(reply => (
                    <div key={reply.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{reply.employeeInvisiboxEmail}</div>
                      </div>
                      <p>{reply.content}</p>
                      {/* MVP v2 features - commented out for now */}
                      {/* <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Tag className="w-4 h-4 mr-1" />
                            Tag
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            Helpful
                          </Button>
                        </div>
                      </div> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-2 sm:p-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Messages & Responses</h1>
        
        <div className="w-full">
          <div className="mb-4">
            <Tabs defaultValue="all">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all" className="flex-1 sm:flex-none">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1 sm:flex-none">With Replies</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                {[...Array(3)].map((_, i) => (
                  <MessageCardSkeleton key={i} />
                ))}
              </TabsContent>
              
              <TabsContent value="unread" className="mt-4">
                {[...Array(2)].map((_, i) => (
                  <MessageCardSkeleton key={i} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  // Show error or empty state
  if (error || !messages || messages.length === 0) {
    return (
      <div className="container mx-auto p-2 sm:p-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Messages & Responses</h1>
        
        <Card className="text-center py-12">
          <CardContent>
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">
              {error ? "Error Loading Messages" : "No Messages Found"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {error 
                ? "There was an issue fetching your messages. Please try again later." 
                : "You haven't sent any messages yet. Create your first message to start communicating with employees."
              }
            </p>
            {error && (
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate messages with replies
  const messagesWithReplies = messages.filter((message: Message) => message.replies && message.replies.length > 0);

  // Show main messages view
  return (
    <div className="container mx-auto p-2 sm:p-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Messages & Responses</h1>
      <p className="text-muted-foreground mb-6">
        View and manage messages sent to employees. Click on a message to see its details and replies.
      </p>
      
      <div className="w-full">
        <div className="mb-4">
          <Tabs defaultValue="all">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="flex-1 sm:flex-none">All ({messages.length})</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1 sm:flex-none">With Replies ({messagesWithReplies.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              {messages.map((message: Message) => (
                <MessageCard 
                  key={message.id}
                  message={message}
                  onSelect={setSelectedMessage}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="unread" className="mt-4">
              {messagesWithReplies.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Messages with Replies</h3>
                  <p className="text-muted-foreground">
                    None of your messages have received replies yet.
                  </p>
                </div>
              ) : (
                messagesWithReplies.map((message: Message) => (
                  <MessageCard 
                    key={message.id}
                    message={message}
                    onSelect={setSelectedMessage}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
