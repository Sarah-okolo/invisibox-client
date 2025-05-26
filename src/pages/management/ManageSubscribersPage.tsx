
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for subscribers
const mockSubscribers = [
  {
    id: '1',
    email: 'employee1@company.com',
  },
  {
    id: '2',
    email: 'employee2@company.com',
  },
  {
    id: '3',
    email: 'employee3@company.com',
  },
  {
    id: '4',
    email: 'employee4@company.com',
  },
];

export default function ManageSubscribersPage() {
  const [subscribers, setSubscribers] = useState(mockSubscribers);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeSubscriber = (subscriberId: string) => {
    setSubscribers(prev => prev.filter(subscriber => subscriber.id !== subscriberId));
    
    const removeData = {
      subscriberId,
      action: 'remove',
      timestamp: new Date().toISOString(),
    };
    console.log('Remove subscriber data ready for backend:', removeData);
    
    toast({
      title: "Subscriber removed",
      description: "The subscriber has been removed from the platform.",
    });
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Subscribers</h1>
      
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search subscribers by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscribers ({filteredSubscribers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredSubscribers.map((subscriber) => (
              <div key={subscriber.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                <span className="font-medium">{subscriber.email}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSubscriber(subscriber.id)}
                  className="flex items-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove</span>
                </Button>
              </div>
            ))}
          </div>
          
          {filteredSubscribers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No subscribers found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
