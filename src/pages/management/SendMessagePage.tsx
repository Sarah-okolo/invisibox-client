
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export default function SendMessagePage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Your message has been sent to all subscribers.",
      });
      setIsLoading(false);
      setTitle('');
      setMessage('');
      setTags([]);
      setFile(null);
    }, 1500);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Send Message to Employees</h1>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Compose Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Message Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Enter message title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message Content</Label>
                <Textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Write your message here..."
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="tags" 
                    value={tagInput} 
                    onChange={(e) => setTagInput(e.target.value)} 
                    onKeyDown={handleTagKeyDown}
                    placeholder="Add tags (press Enter)"
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {tag}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeTag(tag)} 
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachment">Attachment (optional)</Label>
                <Input 
                  id="attachment" 
                  type="file" 
                  onChange={handleFileChange}
                />
                {file && (
                  <p className="text-sm text-muted-foreground">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading || !title || !message}>
                {isLoading ? 'Sending...' : 'Send to All Subscribers'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
