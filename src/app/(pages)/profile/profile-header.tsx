'use client';

import axios from 'axios';
import { motion } from 'framer-motion';
import { MessageSquare, UserCheck, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ProfileStats from './profile-stats';
import ShareDialog from './share-dialog';

interface ProfileHeaderProps {
  // biome-ignore lint: error
  user: any;
  isLoading: boolean;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const { data: session } = useSession();

  const handleFollow = useCallback(() => {
    setIsFollowing((prev) => {
      const newState = !prev;

      if (prev) {
        toast.info(`Unfollowed ${user.name}`);
      } else {
        toast.success(`Following ${user.name}`);
      }

      return newState;
    });
  }, [user.name]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !user.id || !session?.user) {
      return;
    }

    setIsSending(true);
    try {
      // First create or get existing conversation
      const conversationResponse = await axios.post('/api/chat/conversations', {
        userId: user.id,
      });
      const conversationId = conversationResponse.data.id;

      // Then send the message
      await axios.post(`/api/conversations/${conversationId}/messages`, {
        content: messageText,
      });

      // Close dialog and reset form
      setMessageOpen(false);
      setMessageText('');

      // Navigate to the conversation
      router.push(`/messages/${conversationId}`);

      toast.success(`Message sent to ${user.name}`);
      // biome-ignore lint: error
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className='space-y-6'>
      <Card className='overflow-hidden border-none bg-linear-to-r from-slate-100 to-slate-50 shadow-md dark:from-slate-900 dark:to-slate-800'>
        <CardContent className='p-6 sm:p-8'>
          <div className='flex flex-col items-center gap-6 sm:flex-row sm:items-center'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='relative'
            >
              <div className='absolute -inset-1 rounded-full bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-75 blur-xs'></div>
              <Avatar className='border-background h-28 w-28 border-4 shadow-xl'>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className='text-4xl font-medium'>
                  {user.name
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <div className='flex-1 text-center sm:text-left'>
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h1 className='mb-2 text-3xl font-bold'>{user.name}</h1>
                <div className='mb-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start'>
                  <Badge variant='outline' className='px-3 py-1 text-sm'>
                    {user.status}
                  </Badge>
                  {user.location && (
                    <Badge variant='secondary' className='px-3 py-1 text-sm'>
                      {user.location}
                    </Badge>
                  )}
                </div>
                <p className='text-muted-foreground max-w-md text-sm'>
                  {user.bio?.substring(0, 120)}
                  {user.bio?.length > 120 ? '...' : ''}
                </p>
              </motion.div>
            </div>

            <div className='mt-4 flex flex-wrap justify-center gap-2 sm:mt-0 sm:justify-end'>
              <Button
                variant={isFollowing ? 'outline' : 'default'}
                onClick={handleFollow}
                className='gap-1.5 transition-all duration-300 hover:scale-105'
              >
                {isFollowing ? (
                  <>
                    <UserCheck className='h-4 w-4' />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className='h-4 w-4' />
                    <span>Follow</span>
                  </>
                )}
              </Button>

              <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant='default'
                    className='gap-1.5 transition-all duration-300 hover:scale-105'
                  >
                    <MessageSquare className='h-4 w-4' />
                    <span>Message</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Send a message to {user.name}</DialogTitle>
                    <DialogDescription>
                      Your message will be delivered directly to {user.name}
                      &#39;s inbox.
                    </DialogDescription>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='message' className='text-right'>
                        Message
                      </Label>
                      <Textarea
                        id='message'
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className='col-span-3'
                        placeholder="I'm interested in working with you on a project..."
                        rows={5}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant='default'
                      className='gap-1.5 transition-all duration-300 hover:scale-105'
                      onClick={handleSendMessage}
                      disabled={isSending || !messageText.trim()}
                    >
                      {isSending ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <MessageSquare className='h-4 w-4' />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <ShareDialog
                title='Share This Profile'
                description={`Check out ${user.name}'s profile`}
                url={window.location.href}
                variant='default'
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileStats
        designCount={user._count?.design || 0}
        joinDate={user.createdAt}
        status={user.status}
      />
    </div>
  );
}
