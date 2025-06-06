
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge'; // MVP v2 feature - commented out
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Clock, ArrowLeft } from 'lucide-react';
// MVP v2 features - commented out for now
// import { Tag, ThumbsUp } from 'lucide-react';
import { useMessagesQuery } from '@/hooks/useMessagesQuery';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  title: string;
  content: string;
  sentAt: string;
  // MVP v2 features - commented out for now
  // tags?: string[];
  replies?: Reply[];
}

interface Reply {
  id: string;
  content: string;
  sentAt: string;
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
            {formatDistanceToNow(new Date(message.sentAt), { addSuffix: true })}
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

export default function ViewMessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { data: messages = [], isLoading, error } = useMessagesQuery();
  
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
                {formatDistanceToNow(new Date(selectedMessage.sentAt), { addSuffix: true })}
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
                        <div className="font-medium">Anonymous Employee</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(reply.sentAt), { addSuffix: true })}
                        </div>
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

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 py-8">
        <div className="text-center">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 py-8">
        <div className="text-center text-red-500">Error loading messages</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Messages & Responses</h1>
      
      <div className="mb-4">
        <Tabs defaultValue="all">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">With Replies</TabsTrigger>
            {/* MVP v2 feature - commented out for now */}
            {/* <TabsTrigger value="important" className="flex-1">Important</TabsTrigger> */}
          </TabsList>
        </Tabs>
      </div>
      
      {messages.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No messages sent yet
        </div>
      ) : (
        messages.map((message: Message) => (
          <MessageCard 
            key={message.id}
            message={message}
            onSelect={setSelectedMessage}
          />
        ))
      )}
    </div>
  );
}
