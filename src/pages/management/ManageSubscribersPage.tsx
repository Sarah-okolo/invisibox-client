
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Search, Ban, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for subscribers
const mockSubscribers = [
  {
    id: '1',
    email: 'employee1@company.com',
    subscribedAt: '2023-05-01T10:00:00Z',
    canSend: true,
    canReceive: true,
    messageCount: 5,
    status: 'active',
    lastActivity: '2023-05-20T14:30:00Z'
  },
  {
    id: '2',
    email: 'employee2@company.com',
    subscribedAt: '2023-04-15T09:30:00Z',
    canSend: false,
    canReceive: true,
    messageCount: 12,
    status: 'restricted',
    lastActivity: '2023-05-19T11:20:00Z'
  },
  {
    id: '3',
    email: 'employee3@company.com',
    subscribedAt: '2023-03-20T16:45:00Z',
    canSend: true,
    canReceive: false,
    messageCount: 8,
    status: 'restricted',
    lastActivity: '2023-05-18T09:15:00Z'
  },
  {
    id: '4',
    email: 'employee4@company.com',
    subscribedAt: '2023-05-10T12:00:00Z',
    canSend: true,
    canReceive: true,
    messageCount: 3,
    status: 'active',
    lastActivity: '2023-05-21T10:45:00Z'
  },
];

export default function ManageSubscribersPage() {
  const [subscribers, setSubscribers] = useState(mockSubscribers);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePermission = (subscriberId: string, permission: 'canSend' | 'canReceive') => {
    setSubscribers(prev => prev.map(subscriber => {
      if (subscriber.id === subscriberId) {
        const updated = { ...subscriber, [permission]: !subscriber[permission] };
        updated.status = (updated.canSend && updated.canReceive) ? 'active' : 'restricted';
        
        // Prepare data for backend
        const permissionData = {
          subscriberId,
          permission,
          value: updated[permission]
        };
        console.log('Permission change data ready for backend:', permissionData);
        
        toast({
          title: "Permission updated",
          description: `Subscriber ${permission === 'canSend' ? 'sending' : 'receiving'} permission has been ${updated[permission] ? 'enabled' : 'disabled'}.`,
        });
        
        return updated;
      }
      return subscriber;
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'restricted':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Ban className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'restricted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
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

      <div className="grid gap-4">
        {filteredSubscribers.map((subscriber) => (
          <Card key={subscriber.id}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center space-x-2">
                  {getStatusIcon(subscriber.status)}
                  <span>{subscriber.email}</span>
                </CardTitle>
                <Badge className={getStatusColor(subscriber.status)}>
                  {subscriber.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Subscribed</p>
                  <p className="font-medium">
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Messages Sent</p>
                  <p className="font-medium">{subscriber.messageCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Activity</p>
                  <p className="font-medium">
                    {new Date(subscriber.lastActivity).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{subscriber.status}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`send-${subscriber.id}`}
                    checked={subscriber.canSend}
                    onCheckedChange={() => togglePermission(subscriber.id, 'canSend')}
                  />
                  <Label htmlFor={`send-${subscriber.id}`} className="cursor-pointer">
                    Can send messages
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`receive-${subscriber.id}`}
                    checked={subscriber.canReceive}
                    onCheckedChange={() => togglePermission(subscriber.id, 'canReceive')}
                  />
                  <Label htmlFor={`receive-${subscriber.id}`} className="cursor-pointer">
                    Can receive messages
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredSubscribers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No subscribers found matching your search.</p>
        </div>
      )}
    </div>
  );
}
