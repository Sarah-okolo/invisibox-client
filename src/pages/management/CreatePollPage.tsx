import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/lib/axiosInstance';

export default function CreatePollPage() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [activeTime, setActiveTime] = useState('7'); // Default to 7 days
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createPollMutation = useMutation({
    mutationFn: async (pollData: { title: string; question: string; options: string[]; activeTime: number }) => {
      const response = await axiosInstance.post('/polls', pollData);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Poll created",
        description: "Your poll has been created and is now available to employees.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      
      // Reset form
      setTitle('');
      setQuestion('');
      setOptions(['', '']);
      setActiveTime('7');

      navigate('/management/polls');
      
      // Invalidate polls query
      queryClient.invalidateQueries({ queryKey: ['polls'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error creating poll",
        description: error.response?.data?.message || "Failed to create poll. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    } else {
      toast({
        title: "Maximum options reached",
        description: "You can only add up to 6 options for a poll.",
        variant: "destructive",
      });
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    } else {
      toast({
        title: "Minimum options required",
        description: "A poll must have at least 2 options.",
        variant: "destructive",
      });
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const filledOptions = options.filter(option => option.trim() !== '');
    if (filledOptions.length < 2) {
      toast({
        title: "Invalid options",
        description: "Please provide at least 2 valid options for your poll.",
        variant: "destructive",
      });
      return;
    }
    
    const pollData = {
      title,
      question,
      options: filledOptions,
      activeTime: parseInt(activeTime)
    };

    console.log('Creating poll with data:', pollData);
    
    createPollMutation.mutate(pollData);
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create New Poll 📢</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Poll Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Poll Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Enter a title for your poll"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="question">Poll Question</Label>
                <Textarea 
                  id="question" 
                  value={question} 
                  onChange={(e) => setQuestion(e.target.value)} 
                  placeholder="What do you want to ask your employees?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activeTime">Poll Active Duration</Label>
                <Select value={activeTime} onValueChange={setActiveTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Day</SelectItem>
                    <SelectItem value="2">2 Days</SelectItem>
                    <SelectItem value="3">3 Days</SelectItem>
                    <SelectItem value="7">1 Week</SelectItem>
                    <SelectItem value="14">2 Weeks</SelectItem>
                    <SelectItem value="30">1 Month</SelectItem>
                    <SelectItem value="60">2 Months</SelectItem>
                    <SelectItem value="90">3 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Poll Options</Label>
                  <span className="text-sm text-muted-foreground">
                    {options.length}/6 options
                  </span>
                </div>

                {options.map((option, index) => (
                  <div key={index} className="space-y-2">
                    <div className=" items-center flex gap-1">
                      <div className='w-full'>
                        <Input 
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          required
                        />
                      </div>

                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeOption(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={addOption}
                  disabled={options.length >= 6}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                disabled={createPollMutation.isPending || !title || !question || options.some(opt => !opt.trim())}
                className="w-full"
              >
                {createPollMutation.isPending ? 'Creating Poll...' : 'Create Poll'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
