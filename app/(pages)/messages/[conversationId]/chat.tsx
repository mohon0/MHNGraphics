'use client';
import dynamic from 'next/dynamic';

const MessageList = dynamic(() => import('./message-list'), {
  ssr: false,
});

export default function Chat({ conversationId }: { conversationId: string }) {
  return <MessageList conversationId={conversationId} />;
}
