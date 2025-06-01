
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
  const banMutation = useBanSubscriberMutation();

  const handleBan = () => {
    if (!subscriber || !reason.trim()) return;

    banMutation.mutate(
      {
        subscriberId: subscriber._id,
        reason: reason.trim(),
      },
      {
        onSuccess: () => {
          setReason('');
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Ban Subscriber</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to ban <strong>{subscriber?.employeeInvisiboxEmail}</strong>. 
            This subscriber will no longer be able to send or receive messages to and from your company.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-2">
          <Label htmlFor="reason">Reason for banning</Label>
          <Input
            id="reason"
            placeholder="Enter reason for banning this subscriber..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={banMutation.isPending}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose} disabled={banMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleBan}
            disabled={!reason.trim() || banMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {banMutation.isPending ? 'Banning...' : 'Ban Subscriber'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
