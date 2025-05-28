
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Eye, EyeOff, Share, Clock, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

// Colors for the charts
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

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
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{poll.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(poll.createdAt).toLocaleDateString()}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{poll.question}</p>
        
        <div className="flex justify-between items-center">
          <span className={`text-sm ${poll.isActive ? 'text-green-500' : 'text-orange-500'}`}>
            {poll.isActive ? 'Active' : 'Closed'}
          </span>
          
          <div className="flex items-center">
            {poll.isResultsVisible ? (
              <Eye className="w-4 h-4 text-muted-foreground" />
            ) : (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="ml-2 text-sm text-muted-foreground">
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
  const [chartType, setChartType] = useState('bar');
  const { toast } = useToast();
  
  const toggleResultsVisibility = (poll: typeof mockPolls[0]) => {
    // In a real app, this would make an API call
    toast({
      title: `Results ${poll.isResultsVisible ? 'hidden' : 'visible'}`,
      description: `Poll results are now ${poll.isResultsVisible ? 'hidden from' : 'visible to'} employees.`,
    });
    
    // Update the local state for UI feedback
    const updatedPoll = { ...poll, isResultsVisible: !poll.isResultsVisible };
    setSelectedPoll(updatedPoll);
  };
  
  const sharePollResults = () => {
    // In a real app, this would create and send an image of the results
    toast({
      title: "Results shared",
      description: "Poll results have been shared with all subscribers.",
    });
  };
  
  const downloadPollResults = () => {
    // In a real app, this would generate and download a CSV or PDF
    toast({
      title: "Download started",
      description: "Your poll results will download shortly.",
    });
  };

  // Calculate total votes for the selected poll
  const totalVotes = selectedPoll?.options.reduce((sum, option) => sum + option.votes, 0) || 0;
  
  return (
    <>
      <div className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Polls & Results</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Tabs defaultValue="all">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
                  <TabsTrigger value="closed" className="flex-1">Closed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {mockPolls.map(poll => (
              <PollCard 
                key={poll.id}
                poll={poll}
                onSelect={setSelectedPoll}
              />
            ))}
          </div>
          
          <div className="lg:col-span-2">
            {selectedPoll ? (
              <Card>
                <CardHeader className="border-b">
                  <div className="flex justify-between items-start">
                    <CardTitle>{selectedPoll.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {new Date(selectedPoll.createdAt).toLocaleString()}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">{selectedPoll.question}</h3>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="results-visibility"
                        checked={selectedPoll.isResultsVisible}
                        onCheckedChange={() => toggleResultsVisibility(selectedPoll)}
                      />
                      <Label htmlFor="results-visibility">
                        {selectedPoll.isResultsVisible ? 'Results visible to employees' : 'Results hidden from employees'}
                      </Label>
                    </div>
                    <div className="text-sm">
                      Total votes: <strong>{totalVotes}</strong>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Tabs value={chartType} onValueChange={setChartType}>
                      <TabsList className="mb-4">
                        <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                        <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                      </TabsList>
                      <TabsContent value="bar">
                        <div className="w-full h-[300px]">
                          <ResponsiveContainer>
                            <BarChart data={selectedPoll.options}>
                              <XAxis dataKey="text" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="votes">
                                {selectedPoll.options.map((_, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>
                      <TabsContent value="pie">
                        <div className="w-full h-[300px]">
                          <ResponsiveContainer>
                            <PieChart>
                              <Pie
                                data={selectedPoll.options}
                                dataKey="votes"
                                nameKey="text"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                              >
                                {selectedPoll.options.map((_, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      onClick={sharePollResults}
                      className="w-full"
                    >
                      <Share className="h-4 w-4 mr-2" />
                      Share Results with Employees
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={downloadPollResults}
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full border rounded-lg p-8 bg-gray-50">
                <div className="text-center">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No Poll Selected</h3>
                  <p className="text-muted-foreground">
                    Select a poll from the list to view its results.
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
