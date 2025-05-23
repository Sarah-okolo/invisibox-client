
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, Clock, ThumbsUp, Tag } from 'lucide-react';

// Mock data for messages
const mockMessages = [
  {
    id: '1',
    title: 'Company Update: New Office',
    content: 'We are excited to announce that we will be moving to a new office location next month...',
    sentAt: '2023-05-15T14:30:00Z',
    tags: ['Announcement', 'Important'],
    replies: [
      {
        id: '101',
        content: 'Great news! Will there be more parking space available?',
        sentAt: '2023-05-15T15:45:00Z',
      },
      {
        id: '102',
        content: 'Is the new location accessible by public transportation?',
        sentAt: '2023-05-16T09:20:00Z',
      }
    ]
  },
  {
    id: '2',
    title: 'Feedback Request: New Benefits Package',
    content: 'We are reviewing our benefits package and would appreciate your anonymous feedback on the current offerings...',
    sentAt: '2023-05-10T11:15:00Z',
    tags: ['Feedback', 'Benefits'],
    replies: [
      {
        id: '201',
        content: 'I would like to see better healthcare options.',
        sentAt: '2023-05-10T13:30:00Z',
      }
    ]
  },
  {
    id: '3',
    title: 'Important: System Maintenance',
    content: 'Our systems will be down for maintenance this weekend...',
    sentAt: '2023-05-05T09:00:00Z',
    tags: ['Technical', 'Important'],
    replies: []
  }
];

interface MessageCardProps {
  message: typeof mockMessages[0];
  onSelect: (message: typeof mockMessages[0]) => void;
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
            {new Date(message.sentAt).toLocaleDateString()}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{message.content}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {message.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline">{tag}</Badge>
            ))}
          </div>
          
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{message.replies.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ViewMessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<typeof mockMessages[0] | null>(null);
  const [enableGroupChat, setEnableGroupChat] = useState(false);
  
  return (
    <>
      <Header />
      <div className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Messages & Responses</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Tabs defaultValue="all">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">With Replies</TabsTrigger>
                  <TabsTrigger value="important" className="flex-1">Important</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {mockMessages.map(message => (
              <MessageCard 
                key={message.id}
                message={message}
                onSelect={setSelectedMessage}
              />
            ))}
          </div>
          
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader className="border-b">
                  <div className="flex justify-between items-start">
                    <CardTitle>{selectedMessage.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {new Date(selectedMessage.sentAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedMessage.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="mb-8 whitespace-pre-line">
                    {selectedMessage.content}
                  </div>
                  
                  <div className="flex items-center justify-between mb-6 border-t pt-4">
                    <h3 className="font-semibold flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Replies ({selectedMessage.replies.length})
                    </h3>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="group-chat"
                        checked={enableGroupChat}
                        onCheckedChange={setEnableGroupChat}
                      />
                      <label htmlFor="group-chat" className="text-sm cursor-pointer">
                        Enable Group Chat
                      </label>
                    </div>
                  </div>
                  
                  {selectedMessage.replies.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No replies yet
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedMessage.replies.map(reply => (
                        <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">Anonymous Employee</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(reply.sentAt).toLocaleString()}
                            </div>
                          </div>
                          <p>{reply.content}</p>
                          <div className="flex justify-between items-center mt-2">
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
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full border rounded-lg p-8 bg-gray-50">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Message Selected</h3>
                  <p className="text-muted-foreground">
                    Select a message from the list to view its content and replies.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
