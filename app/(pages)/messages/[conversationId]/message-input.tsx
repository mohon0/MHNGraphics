'use client';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Paperclip, Send, Smile } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSend: (message: string) => void;
  isSending?: boolean;
  onTyping?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MessageInput({
  onSend,
  isSending = false,
  onTyping,
  placeholder = 'Type a message...',
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  const handleSend = () => {
    if (!message.trim() || isSending || disabled) return;
    onSend(message);
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }

    // Handle typing indicator
    if (onTyping) {
      onTyping();

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };
  // biome-ignore lint: error
  const addEmoji = (emoji: any) => {
    setMessage((prev) => prev + emoji.native);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    const timeout = typingTimeoutRef.current;
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <div className='flex items-end gap-2 border-t bg-background p-3 sm:p-4'>
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='hidden shrink-0 rounded-full sm:flex'
      >
        <Paperclip className='h-5 w-5' />
        <span className='sr-only'>Attach</span>
      </Button>

      <div className='relative flex-1'>
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'max-h-32 min-h-10 w-full resize-none rounded-2xl py-3 pr-12 text-sm sm:text-base',
            disabled && 'opacity-50',
          )}
          disabled={disabled}
          rows={1}
        />
        <div className='absolute bottom-1 right-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 rounded-full'
              >
                <Smile className='h-5 w-5' />
                <span className='sr-only'>Emoji</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? 'top' : 'top'}
              align='end'
              className='w-auto border-none p-0'
            >
              <Picker
                data={data}
                onEmojiSelect={addEmoji}
                theme='light'
                previewPosition='none'
                skinTonePosition='none'
                emojiSize={isMobile ? 20 : 24}
                emojiButtonSize={isMobile ? 30 : 36}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button
        onClick={handleSend}
        size='icon'
        className={cn(
          'shrink-0 rounded-full transition-all',
          !message.trim() && 'opacity-50',
        )}
        disabled={!message.trim() || isSending || disabled}
      >
        <Send className='h-5 w-5' />
        <span className='sr-only'>Send</span>
      </Button>
    </div>
  );
}
