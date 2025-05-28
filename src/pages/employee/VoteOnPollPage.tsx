import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, Vote, CheckCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function VoteOnPollPage() {
  const { pollId } = useParams();
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  // Mock poll data
  const poll = {
    id: pollId,
    title: 'Which benefit would you most like to see improved?',
    description: 'Help us prioritize which employee benefit to focus on next year.',
    options: [
      { id: '1', text: 'Health Insurance Coverage', votes: 0 },
      { id: '2', text: 'Flexible Working Hours', votes: 0 },
      { id: '3', text: 'Professional Development Budget', votes: 0 },
      { id: '4', text: 'Remote Work Equipment', votes: 0 },
    ],
    expiresAt: '2023-06-30T23:59:59Z',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOption) {
      toast({
        title: "No option selected",
        description: "Please select an option before voting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const voteData = {
      pollId,
      selectedOptionId: selectedOption,
      timestamp: new Date().toISOString(),
    };
    
    console.log('Vote data ready for backend:', voteData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setHasVoted(true);
      toast({
        title: "Vote submitted successfully",
        description: "Thank you for participating in this anonymous poll.",
      });
    }, 1000);
  };

  if (hasVoted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 flex items-center justify-center p-4 py-16">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Vote Submitted!</h2>
            <p className="text-muted-foreground mb-4">
              Thank you for participating in this anonymous poll. Your vote has been recorded.
            </p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 p-4 py-16">
      <div className="container mx-auto max-w-2xl">
        <Link to="/" className="flex items-center mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            InvisiBox
          </span>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="w-5 w-5" />
              {poll.title}
            </CardTitle>
            <CardDescription>
              {poll.description}
              <br />
              <span className="text-sm">
                Poll expires: {new Date(poll.expiresAt).toLocaleDateString()}
              </span>
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                {poll.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Anonymous Voting:</strong> Your vote is completely anonymous. 
                  No one can trace this vote back to you.
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !selectedOption}>
                {isLoading ? 'Submitting Vote...' : 'Submit Anonymous Vote'}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
