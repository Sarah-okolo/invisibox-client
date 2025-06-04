
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { PollResultsModal } from '@/components/PollResultsModal';

interface PollCardProps {
  poll: {
    id: string;
    title: string;
    question: string;
    createdAt: string;
    isActive: boolean;
    options: Array<{ text: string; votes: number }>;
  };
  onSelect: (poll: any) => void;
}

function PollCard({ poll, onSelect }: PollCardProps) {
  return (
    <Card 
      className="mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onSelect(poll)}
    >
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
          <h3 className="font-semibold text-lg">{poll.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(poll.createdAt).toLocaleDateString()}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{poll.question}</p>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span className={`text-sm ${poll.isActive ? 'text-green-500' : 'text-orange-500'}`}>
            {poll.isActive ? 'Active' : 'Closed'}
          </span>

          <span className="text-sm text-muted-foreground font-bold">
            {poll.options.reduce((sum, option) => sum + option.votes, 0)} votes
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function PollCardSkeleton() {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ViewPollsPage() {
  const [selectedPoll, setSelectedPoll] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  
  const { data: polls = [], isLoading } = useQuery({
    queryKey: ['polls'],
    queryFn: async () => {
      const response = await axiosInstance.get('/polls');
      console.log(response)
      return response.data.polls || [];
    },
  });
  
  const handlePollSelect = (poll: any) => {
    setSelectedPoll(poll);
    setIsModalOpen(true);
  };

  const activePolls = polls.filter((poll: any) => poll.isActive);
  const closedPolls = polls.filter((poll: any) => !poll.isActive);
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-2 sm:p-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Polls & Results</h1>
        
        <div className="w-full">
          <div className="mb-4">
            <Tabs defaultValue="all">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all" className="flex-1 sm:flex-none">All</TabsTrigger>
                <TabsTrigger value="active" className="flex-1 sm:flex-none">Active</TabsTrigger>
                <TabsTrigger value="closed" className="flex-1 sm:flex-none">Closed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                {[...Array(3)].map((_, i) => (
                  <PollCardSkeleton key={i} />
                ))}
              </TabsContent>
              
              <TabsContent value="active" className="mt-4">
                {[...Array(2)].map((_, i) => (
                  <PollCardSkeleton key={i} />
                ))}
              </TabsContent>
              
              <TabsContent value="closed" className="mt-4">
                {[...Array(1)].map((_, i) => (
                  <PollCardSkeleton key={i} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-2 sm:p-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Polls & Results</h1>
      
      <div className="w-full">
        <div className="mb-4">
          <Tabs defaultValue="all">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all" className="flex-1 sm:flex-none">All ({polls.length})</TabsTrigger>
              <TabsTrigger value="active" className="flex-1 sm:flex-none">Active ({activePolls.length})</TabsTrigger>
              <TabsTrigger value="closed" className="flex-1 sm:flex-none">Closed ({closedPolls.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              {polls.map((poll: any, index: number) => (
                <PollCard 
                  key={index}
                  poll={poll}
                  onSelect={handlePollSelect}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="active" className="mt-4">
              {activePolls.map((poll: any, index: number) => (
                <PollCard 
                  key={index}
                  poll={poll}
                  onSelect={handlePollSelect}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="closed" className="mt-4">
              {closedPolls.map((poll: any, index: number) => (
                <PollCard 
                  key={index}
                  poll={poll}
                  onSelect={handlePollSelect}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
        
        {polls.length === 0 && (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No Polls Found</h3>
            <p className="text-muted-foreground">
              Create your first poll to get started with employee feedback.
            </p>
          </div>
        )}
      </div>

      <PollResultsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        poll={selectedPoll}
      />
    </div>
  );
}
