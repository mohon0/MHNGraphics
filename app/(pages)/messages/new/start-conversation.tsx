'use client';

import axios from 'axios';
import { Search, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useConversations } from '@/hooks/use-conversation';
import { useDebounce } from '@/hooks/useDebounce';

export function StartConversation() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  // biome-ignore lint: error
  const [users, setUsers] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { createConversation, isCreating } = useConversations();

  useEffect(() => {
    const searchUsers = async () => {
      if (!debouncedSearch.trim()) {
        setUsers([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await axios.get(
          `/api/chat/users/search?query=${encodeURIComponent(debouncedSearch)}`,
        );
        setUsers(response.data);
      } catch (error) {
        // biome-ignore lint: error
        console.error('Error searching users:', error);
      } finally {
        setIsSearching(false);
      }
    };

    searchUsers();
  }, [debouncedSearch]);

  const handleStartConversation = (userId: string) => {
    createConversation(userId, {
      // biome-ignore lint: error
      onSuccess: (conversation: any) => {
        router.push(`/messages/${conversation.id}`);
      },
    });
  };

  return (
    <div className='space-y-6'>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search users by name or email'
          className='py-6 pl-10 text-lg'
        />
      </div>

      <div className='rounded-lg border'>
        {isSearching ? (
          <div className='space-y-2 p-4'>
            <Skeleton className='h-16 w-full' />
            <Skeleton className='h-16 w-full' />
            <Skeleton className='h-16 w-full' />
          </div>
        ) : users.length > 0 ? (
          <div className='divide-y'>
            {users.map((user) => (
              <div
                key={user.id}
                className='flex items-center justify-between p-4 transition-colors hover:bg-accent'
              >
                <div className='flex items-center gap-3'>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage src={user.image || ''} alt={user.name || ''} />
                    <AvatarFallback>
                      {user.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-medium'>{user.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleStartConversation(user.id)}
                  disabled={isCreating}
                  className='gap-2'
                >
                  <UserPlus className='h-4 w-4' />
                  Message
                </Button>
              </div>
            ))}
          </div>
        ) : search ? (
          <div className='p-8 text-center'>
            <UserPlus className='mx-auto h-12 w-12 text-muted-foreground' />
            <h3 className='mt-4 text-lg font-medium'>No users found</h3>
            <p className='mt-2 text-muted-foreground'>
              Try searching with a different name or email
            </p>
          </div>
        ) : (
          <div className='p-8 text-center'>
            <Search className='mx-auto h-12 w-12 text-muted-foreground' />
            <h3 className='mt-4 text-lg font-medium'>Search for users</h3>
            <p className='mt-2 text-muted-foreground'>
              Find people by their name or email address
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
