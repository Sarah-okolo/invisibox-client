
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyEmail = async () => {
    if (user?.invisiboxEmail) {
      try {
        await navigator.clipboard.writeText(user.invisiboxEmail);
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
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    setIsChangingPassword(true);
    
    // Prepare data for backend
    const passwordChangeData = {
      currentPassword,
      newPassword
    };
    
    console.log('Password change data ready for backend:', passwordChangeData);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed.",
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsChangingPassword(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              View your account details and InvisiBox email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input value={user?.companyName || ''} disabled />
            </div>
            
            <div className="space-y-2">
              <Label>Original Email</Label>
              <Input value={user?.email || ''} disabled />
            </div>
            
            <div className="space-y-2">
              <Label>InvisiBox Email</Label>
              <div className="flex items-center space-x-2">
                <Input value={user?.invisiboxEmail || ''} disabled className="font-mono" />
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
              <p className="text-sm text-orange-700 sm:text-orange-400">
                Use this email to log in to your management dashboard and share to your employees.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="w-5 h-5" />
              <span>Change Password</span>
            </CardTitle>
            <CardDescription>
              Here you can change your account password. Make sure to use a strong password.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handlePasswordChange}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password"
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password"
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password"
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
                className="w-full"
              >
                {isChangingPassword ? 'Updating Password...' : 'Update Password'}
              </Button>
            </CardFooter>
          </form>
        </Card> */}
      </div>
    </div>
  );
}
