
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Mail, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  invisiboxEmail: string;
}

export default function WelcomeModal({ isOpen, onClose, companyName, invisiboxEmail }: WelcomeModalProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(invisiboxEmail);
      setCopied(true);
      toast({
        title: "Email copied!",
        description: "Your InvisiBox email has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy email to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-center text-xl">Welcome to InvisiBox!</DialogTitle>
          <DialogDescription className="text-center">
            Your management account for <strong>{companyName}</strong> has been created successfully.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
              Your Unique InvisiBox Email:
            </h4>
            <div className="flex items-center space-x-2">
              <div className="flex-1 p-2 bg-white dark:bg-slate-900 border rounded text-sm font-mono break-all">
                {invisiboxEmail}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyEmail}
                className="flex-shrink-0"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>• Use this email address to log in to your account</p>
            <p className="text-orange-400">• Share this email address with your employees</p>
            <p>• You can find it anytime in your account settings</p>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Continue to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
