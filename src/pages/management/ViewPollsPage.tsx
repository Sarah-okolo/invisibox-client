
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PollResultsModal } from '@/components/PollResultsModal';

// Mock data for polls
const mockPolls = [
  {
    id: '1',
    title: 'Office Location Preference',
    question: 'Which office location would you prefer for our annual team retreat?',
    createdAt: '2023-05-01T10:00:00Z',
    isActive: true,
    isResultsVisible: true,
    options: [
      { text: 'Mountain Resort', votes: 45 },
      { text: 'Beach House', votes: 60 },
      { text: 'City Center', votes: 20 },
      { text: 'Forest Cabin', votes: 35 },
    ]
  },
  {
    id: '2',
    title: 'New Benefits Package',
    question: 'Which benefit would you prioritize in the upcoming benefits package?',
    createdAt: '2023-04-15T14:30:00Z',
    isActive: true,
    isResultsVisible: false,
    options: [
      { text: 'Additional Health Insurance Coverage', votes: 80 },
      { text: 'More Vacation Days', votes: 65 },
      { text: 'Remote Work Allowance', votes: 55 },
      { text: 'Education Budget', votes: 40 },
    ]
  },
  {
    id: '3',
    title: 'Company Event Theme',
    question: 'What theme would you prefer for our next company event?',
    createdAt: '2023-03-20T09:15:00Z',
    isActive: false,
    isResultsVisible: true,
    options: [
      { text: 'Casino Night', votes: 30 },
      { text: 'Movie Marathon', votes: 25 },
      { text: 'Outdoor Adventure', votes: 50 },
      { text: 'Game Competition', votes: 40 },
    ]
  }
];

interface PollCardProps {
  poll: typeof mockPolls[0];
  onSelect: (poll: typeof mockPolls[0]) => void;
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
          
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">
              Results {poll.isResultsVisible ? 'Visible' : 'Hidden'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ViewPollsPage() {
  const [selectedPoll, setSelectedPoll] = useState<typeof mockPolls[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [polls, setPolls] = useState(mockPolls);
  const { toast } = useToast();
  
  const handlePollSelect = (poll: typeof mockPolls[0]) => {
    setSelectedPoll(poll);
    setIsModalOpen(true);
  };

  const toggleResultsVisibility = (poll: typeof mockPolls[0]) => {
    toast({
      title: `Results ${poll.isResultsVisible ? 'hidden' : 'visible'}`,
      description: `Poll results are now ${poll.isResultsVisible ? 'hidden from' : 'visible to'} employees.`,
    });
    
    // Update the poll in the state
    setPolls(prevPolls => 
      prevPolls.map(p => 
        p.id === poll.id ? { ...p, isResultsVisible: !p.isResultsVisible } : p
      )
    );

    // Update the selected poll if it's the same one
    if (selectedPoll && selectedPoll.id === poll.id) {
      setSelectedPoll({ ...selectedPoll, isResultsVisible: !selectedPoll.isResultsVisible });
    }
  };

  const activePolls = polls.filter(poll => poll.isActive);
  const closedPolls = polls.filter(poll => !poll.isActive);
  
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
              {polls.map(poll => (
                <PollCard 
                  key={poll.id}
                  poll={poll}
                  onSelect={handlePollSelect}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="active" className="mt-4">
              {activePolls.map(poll => (
                <PollCard 
                  key={poll.id}
                  poll={poll}
                  onSelect={handlePollSelect}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="closed" className="mt-4">
              {closedPolls.map(poll => (
                <PollCard 
                  key={poll.id}
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
        onToggleVisibility={toggleResultsVisibility}
      />
    </div>
  );
}
