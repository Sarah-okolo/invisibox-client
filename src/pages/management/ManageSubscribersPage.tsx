
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Ban, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { BanSubscriberDialog } from '@/components/BanSubscriberDialog';
import { WarnSubscriberDialog } from '@/components/WarnSubscriberDialog';

export default function ManageSubscribersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [warnDialogOpen, setWarnDialogOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  // Query to get company subscribers 
  const subscribers = useQuery({
    queryKey: ['subscribers'],
    queryFn: async () => {
      if (!user) return null;
      const response = await axiosInstance.get(`/subscribers`);
      return response.data;
    },
    enabled: !!user, // Only run if user is available
  });

  useEffect(() => {
    if (subscribers.isSuccess) {
      // Handle successful data fetch if needed
      console.log('company subscribers fetched:', subscribers?.data);
      setFilteredSubscribers(subscribers?.data?.subscribers?.filter(subscriber =>
      subscriber.employeeInvisiboxEmail.toLowerCase().includes(searchTerm.toLowerCase())));
    }
    if (subscribers.isError) {
      // Handle error in fetching data
      toast({
        title: "Error fetching company subscribers",
        description: subscribers.error.message,
        variant: "destructive",
      });
    }
  }, [subscribers.isSuccess, subscribers.isError, searchTerm, subscribers?.data]);

  const handleWarnClick = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setWarnDialogOpen(true);
  };

  const handleBanClick = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setBanDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Manage Subscribers</h1>
      
      <div className="mb-4 sm:mb-6">
        <div className="relative w-full sm:max-w-md">
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
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">
            Subscribers ({filteredSubscribers?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredSubscribers?.map((subscriber) => (
              <div 
                key={subscriber._id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-muted/50 gap-2 sm:gap-4"
              >
                <div>
                  <p className="font-medium text-sm sm:text-base break-all sm:break-normal">
                    {subscriber?.employeeInvisiboxEmail}
                  </p>
                  <p className='text-muted-foreground text-xs mt-2 sm:text-sm'>Has been warned <span className='font-bold'>{subscriber.warned}</span> time{subscriber.warned !== 1 && 's'}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                  { subscriber.warned < 3 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleWarnClick(subscriber)}
                      className="flex items-center space-x-1 w-full sm:w-auto justify-center sm:justify-start border-yellow-600 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Warn</span>
                    </Button>
                  )}
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleBanClick(subscriber)}
                    className="flex items-center space-x-1 w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <Ban className="w-4 h-4" />
                    <span>Ban</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredSubscribers?.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No subscribers found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <WarnSubscriberDialog
        isOpen={warnDialogOpen}
        onClose={() => setWarnDialogOpen(false)}
        subscriber={selectedSubscriber}
      />

      <BanSubscriberDialog
        isOpen={banDialogOpen}
        onClose={() => setBanDialogOpen(false)}
        subscriber={selectedSubscriber}
      />
    </div>
  );
}
