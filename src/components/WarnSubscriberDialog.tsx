
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWarnSubscriberMutation } from '@/hooks/useManagementMutations';

interface WarnSubscriberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subscriber: {
    _id: string;
    employeeInvisiboxEmail: string;
  } | null;
}

export function WarnSubscriberDialog({ isOpen, onClose, subscriber }: WarnSubscriberDialogProps) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const warnMutation = useWarnSubscriberMutation();

  const handleWarn = () => {
    if (!subscriber || !reason.trim() || !details.trim()) return;

    warnMutation.mutate(
      {
        subscriberId: subscriber._id,
        reason: reason.trim(),
        details: details.trim(),
      },
      {
        onSuccess: () => {
          setReason('');
          setDetails('');
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    setReason('');
    setDetails('');
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="w-full sm:max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Warn Subscriber</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to warn <strong>{subscriber?.employeeInvisiboxEmail}</strong>. 
            This will send a warning notification to the subscriber.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for warning *</Label>
            <Input
              id="reason"
              placeholder="Enter reason for warning this subscriber..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={warnMutation.isPending}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="details">Details *</Label>
            <Textarea
              id="details"
              placeholder="Enter additional details about the warning..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              disabled={warnMutation.isPending}
              className="min-h-[80px]"
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose} disabled={warnMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleWarn}
            disabled={!reason.trim() || !details.trim() || warnMutation.isPending}
            className="bg-yellow-600 text-white hover:bg-yellow-700"
          >
            {warnMutation.isPending ? 'Warning...' : 'Warn Subscriber'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
