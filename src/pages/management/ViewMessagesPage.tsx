
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageSquareText, Clock, ArrowLeft, Search } from 'lucide-react';
import { useMessagesQuery } from '@/hooks/useMessagesQuery';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Message {
  _id: string;
  companyId: string;
  title: string;
  content: string;
  createdAt: string;
  replies: Reply[];
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
      <CardContent className="pt-6 border hover:border-purple-500 rounded-lg">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg hover:text-purple-500">{message.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{message.content}</p>
        
        <div className="flex justify-between items-center">
          <div></div>
          <div className="flex items-center text-orange-500">
            <MessageSquareText className="w-4 h-4 mr-1 mt-1" />
            <span className="text-base">{message.replies?.length || 0}</span>
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
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const { data: messages = [], error, isLoading } = useMessagesQuery();

  useEffect(() => {
    if (error) {
      toast({
        description: "There was an issue fetching your messages. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Filter messages based on search query
  const filteredMessages = messages.filter((message: Message) =>
    message.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate messages with replies from filtered results
  const messagesWithReplies = filteredMessages.filter((message: Message) => 
    message.replies && message.replies.length > 0
  );

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
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="mb-8 whitespace-pre-line">
              {selectedMessage.content}
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-semibold flex items-center mb-6 text-orange-500">
                <MessageSquareText className="w-5 h-5 mr-2" />
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
                <TabsTrigger value="replies" className="flex-1 sm:flex-none">With Replies</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                {[...Array(3)].map((_, i) => (
                  <MessageCardSkeleton key={i} />
                ))}
              </TabsContent>
              
              <TabsContent value="replies" className="mt-4">
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
        
        <Card className="text-center py-12 bg-transparent border-none">
          <CardContent>
            <MessageSquareText strokeWidth={1} className="w-14 h-14 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">
              {error ? "Error Loading Messages" : "No Messages Found"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {error 
                ? "There was an issue fetching your messages. Please try again later." 
                : "You haven't sent any messages yet. Send your first message to start communicating with employees."
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

  // Show main messages view
  return (
    <div className="container mx-auto p-2 sm:p-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Messages & Responses</h1>
      <p className="text-muted-foreground mb-6 sm:mb-8 mt-2">
        View and manage messages sent to employees. Click on a message to see its details and replies.
      </p>
      
      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search messages by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="w-full">
        <div className="mb-4">
          <Tabs defaultValue="all">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="flex-1 sm:flex-none">
                All ({filteredMessages.length})
              </TabsTrigger>
              <TabsTrigger value="replies" className="flex-1 sm:flex-none">
                With Replies ({messagesWithReplies.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquareText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    {searchQuery ? "No Messages Found" : "No Messages Yet"}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `No messages found matching "${searchQuery}".`
                      : "You haven't sent any messages yet."
                    }
                  </p>
                </div>
              ) : (
                filteredMessages.map((message: Message) => (
                  <MessageCard 
                    key={message._id}
                    message={message}
                    onSelect={setSelectedMessage}
                  />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="replies" className="mt-4">
              {messagesWithReplies.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquareText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Messages with Replies</h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `No messages with replies found matching "${searchQuery}".`
                      : "None of your messages have received replies yet."
                    }
                  </p>
                </div>
              ) : (
                messagesWithReplies.map((message: Message) => (
                  <MessageCard 
                    key={message._id}
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
