
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
import { useBanSubscriberMutation } from '@/hooks/useManagementMutations';

interface BanSubscriberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subscriber: {
    _id: string;
    employeeInvisiboxEmail: string;
  } | null;
}

export function BanSubscriberDialog({ isOpen, onClose, subscriber }: BanSubscriberDialogProps) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const banMutation = useBanSubscriberMutation();

  const handleBan = () => {
    if (!subscriber || !reason.trim() || !details.trim()) return;

    banMutation.mutate(
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
          <AlertDialogTitle>Ban Subscriber</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to ban <strong>{subscriber?.employeeInvisiboxEmail}</strong>. 
            This subscriber will be removed from this company's channel, and would also prevent future subscription attempts from them.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for banning *</Label>
            <Input
              id="reason"
              placeholder="Enter reason for banning this subscriber..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={banMutation.isPending}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="details">Details *</Label>
            <Textarea
              id="details"
              placeholder="Enter additional details about the ban..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              disabled={banMutation.isPending}
              className="min-h-[80px]"
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose} disabled={banMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleBan}
            disabled={!reason.trim() || !details.trim() || banMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {banMutation.isPending ? 'Banning...' : 'Ban Subscriber'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
