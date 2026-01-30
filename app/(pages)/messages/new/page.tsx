import type { Metadata } from 'next';
import { StartConversation } from './start-conversation';

export const metadata: Metadata = {
  title: 'New Conversation',
  description: 'Start a new conversation',
};

export default function NewConversationPage() {
  return (
    <div className='mx-auto max-w-4xl p-4'>
      <h1 className='mb-6 text-2xl font-bold'>Start a New Conversation</h1>
      <StartConversation />
    </div>
  );
}
