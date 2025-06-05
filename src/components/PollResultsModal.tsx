
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Share, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { downloadPollResults } from '@/utils/downloadUtils';

// Colors for the charts
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

interface PollResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  poll: {
    id: string;
    title: string;
    question: string;
    createdAt: string;
    isActive: boolean;
    options: Array<{ text: string; votes: number }>;
  } | null;
}

export function PollResultsModal({ isOpen, onClose, poll }: PollResultsModalProps) {
  const [chartType, setChartType] = React.useState('bar');
  const chartRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  if (!poll) return null;

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0) || 0;
  console.log('polls options:', poll.options);

  const sharePollResults = () => {
    toast({
      title: "Results shared",
      description: "Poll results have been shared with all subscribers.",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const handleDownloadPollResults = async () => {
    try {
      await downloadPollResults(poll, chartRef.current);
      toast({
        title: "Download successful",
        description: "Poll chart has been downloaded as PNG.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading the poll chart.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:mr-10">
            <span className="text-lg sm:text-xl">{poll.title}</span>
            <span className="text-sm text-muted-foreground">
              {new Date(poll.createdAt).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <h3 className="text-base sm:text-lg font-medium">{poll.question}</h3>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="text-sm">
              Total votes: <strong>{totalVotes}</strong>
            </div>
          </div>

          <div ref={chartRef} className="bg-white p-4 rounded-lg">
            <Tabs value={chartType} onValueChange={setChartType}>
              <TabsList className="mb-4 w-full sm:w-auto">
                <TabsTrigger value="bar" className="flex-1 sm:flex-none">Bar Chart</TabsTrigger>
                <TabsTrigger value="pie" className="flex-1 sm:flex-none">Pie Chart</TabsTrigger>
              </TabsList>
              <TabsContent value="bar">
                <div className="w-full h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={poll.options} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                      <XAxis 
                        dataKey="text" 
                        angle={-35}
                        textAnchor="end"
                        height={20}
                        fontSize={10}
                        interval={0}
                      />
                      <YAxis fontSize={10} />
                      <Tooltip 
                        contentStyle={{
                          fontSize: '12px',
                          padding: '8px',
                          color: '#333',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #ccc',
                          borderRadius: '4px'
                        }}
                      />
                      <Bar dataKey="votes">
                        {poll.options.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="pie">
                <div className="w-full h-[250px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={poll.options}
                        dataKey="votes"
                        nameKey="text"
                        cx="50%"
                        cy="50%"
                        outerRadius="70%"
                        fill="#8884d8"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                        fontSize={10}
                      >
                        {poll.options.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          fontSize: '12px',
                          padding: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #ccc',
                          borderRadius: '4px'
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ fontSize: '10px' }}
                        iconSize={8}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          { totalVotes === 0 ? (
            <div className="text-center relative bottom-7 text-sm text-muted-foreground">
              No votes have been cast for this poll yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={sharePollResults} className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Share Results with Employees
              </Button>
              <Button variant="outline" onClick={handleDownloadPollResults} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Chart
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
