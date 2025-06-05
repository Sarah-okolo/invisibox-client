
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Shield, Vote, CheckCircle } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { formatDistanceToNow } from 'date-fns';

export default function VoteOnPollPage() {
  const { pollId } = useParams();
  const [searchParams] = useSearchParams();
  const compId = searchParams.get('compid');
  const empId = searchParams.get('empid');
  
  const [selectedOption, setSelectedOption] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  // Fetch the poll data using the pollId and compId
  const { data: poll, isLoading, isSuccess } = useQuery({
    queryKey: ['public-poll', pollId, compId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/polls/${pollId}?compid=${compId}`);
      return response.data.poll;
    },
    enabled: !!pollId && !!compId,
  });

  useEffect(() => {
    if (poll) {
      console.log('Fetched Poll:', poll);
    }
  }, [isSuccess]);

  const voteMutation = useMutation({
    mutationFn: async (voteData: { 
      pollid: string; 
      option: string; 
      compid: string; 
      empid: string; 
    }) => {
      const response = await axiosInstance.post(`/polls/vote`, voteData);
      return response.data;
    },
    onSuccess: () => {
      setHasVoted(true);
      toast({
        title: "Vote submitted successfully",
        description: "Thank you for participating in this anonymous poll.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error submitting vote",
        description: error.response?.data?.message || "Failed to submit vote. Please try again.",
        variant: "destructive",
      });
    },
  });

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

    if (!pollId || !compId || !empId) {
      toast({
        title: "Invalid poll link",
        description: "Some required information is missing from the poll link.",
        variant: "destructive",
      });
      return;
    }
    
    const voteData = {
      pollid: pollId,
      option: selectedOption,
      compid: compId,
      empid: empId,
    };
    
    voteMutation.mutate(voteData);
  };

  if (!compId || !empId || !pollId) {
    return (
      <div className="min-h-[85vh] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 flex items-center justify-center p-4 py-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-2">Invalid Poll Link</h2>
            <p className="text-muted-foreground mb-4">
              The poll link you followed is invalid or incomplete. Please check the link and try again.
            </p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[85vh] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 p-4 py-4">
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
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2 p-3 rounded-lg border">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-[85vh] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 flex items-center justify-center p-4 py-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-2">Poll Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The poll you're looking for doesn't exist, has expired, or has been removed.
            </p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (hasVoted) {
    return (
      <div className="min-h-[85vh] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 flex items-center justify-center p-4 py-4">
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
    <div className="min-h-[85vh] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-black dark:to-slate-900 p-4 py-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className='font-bold text-green-400 my-4 text-2xl'>🟢 Active Poll</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 mb-5">
              <Vote className="w-5" />
              {poll.title}
            </CardTitle>
            <CardDescription className='text-base'>
              {poll.question}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 mt-4">
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                {poll.options.map((option: any, index: number) => (
                  <Label 
                    key={index} 
                    htmlFor={option.text} 
                    className="flex items-center space-x-3 p-4 mb-2 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <RadioGroupItem value={option.text} id={option.text} />
                    <span className="flex-1">
                      {option.text}
                    </span>
                  </Label>
                ))}
              </RadioGroup>

              {poll.expiresAt && (
                <>
                  <br />
                  <span className="text-sm">
                    Poll expires in: <span className='text-orange-500'>{formatDistanceToNow(new Date(poll.expiresAt))}</span>
                  </span>
                </>
              )}
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Anonymous Voting:</strong> Your vote is completely anonymous. 
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={voteMutation.isPending || !selectedOption}>
                {voteMutation.isPending ? 'Submitting Vote...' : 'Submit Vote'}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
