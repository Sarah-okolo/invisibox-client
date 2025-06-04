
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/lib/axiosInstance';


export default function CreatePollPage() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createPollMutation = useMutation({
    mutationFn: async (pollData: { title: string; question: string; options: string[] }) => {
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
      options: filledOptions
    };
    
    createPollMutation.mutate(pollData);
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create New Poll</h1>
      
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

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Poll Options</Label>
                  <span className="text-sm text-muted-foreground">
                    {options.length}/6 options
                  </span>
                </div>

                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input 
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeOption(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
