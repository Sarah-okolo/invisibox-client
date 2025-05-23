
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Shield, ArrowLeft, Check } from 'lucide-react';

// Mock poll data
const mockPoll = {
  id: 'poll123',
  title: 'Office Location Preference',
  question: 'Which office location would you prefer for our annual team retreat?',
  options: [
    { id: 'opt1', text: 'Mountain Resort' },
    { id: 'opt2', text: 'Beach House' },
    { id: 'opt3', text: 'City Center' },
    { id: 'opt4', text: 'Forest Cabin' },
  ],
};

export default function VoteOnPollPage() {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoadingPoll, setIsLoadingPoll] = useState(true);
  const [poll, setPoll] = useState(mockPoll);
  const { pollId } = useParams<{ pollId: string }>();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would fetch the poll from an API
    setIsLoadingPoll(true);
    
    setTimeout(() => {
      setIsLoadingPoll(false);
    }, 800);
  }, [pollId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOption) {
      toast({
        title: "No option selected",
        description: "Please select an option to vote.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Vote submitted",
        description: "Your anonymous vote has been recorded.",
      });
      setSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  if (isLoadingPoll) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading poll...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container max-w-md mx-auto py-8">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        
        <Card>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-xl">{poll.title}</CardTitle>
          </CardHeader>
          
          <CardContent>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Vote Submitted!</h3>
                <p className="text-gray-600 mb-6">
                  Your anonymous vote has been recorded. Thank you for participating.
                </p>
                <Link to="/">
                  <Button variant="outline" className="w-full">Return to Home</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">{poll.question}</h3>
                  
                  <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                    {poll.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="cursor-pointer w-full py-2">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="text-sm text-muted-foreground mb-6">
                  Your vote will be completely anonymous. Management will only see aggregated results.
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading || !selectedOption} 
                  className="w-full"
                >
                  {isLoading ? 'Submitting...' : 'Submit Vote'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
