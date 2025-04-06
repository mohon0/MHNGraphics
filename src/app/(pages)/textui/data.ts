// Types
export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "self" | "other";
  senderName?: string;
  avatar?: string;
}

// Conversations
export const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'll send you the files soon",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Alex Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Let's schedule a meeting",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The project looks great!",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "4",
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your help",
    time: "Monday",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Team Chat",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "David: Let's discuss this tomorrow",
    time: "Sunday",
    unread: 5,
    online: true,
    isGroup: true,
  },
  {
    id: "6",
    name: "Linda Park",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I’ve updated the pitch deck",
    time: "Today",
    unread: 1,
    online: true,
  },
  {
    id: "7",
    name: "Daniel Green",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Call me when you’re free",
    time: "Today",
    unread: 0,
    online: false,
  },
];

// Messages
export const messagesData: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      content: "Hey Sarah! Just pushed the latest updates to the repo.",
      timestamp: "2:15 PM",
      sender: "self",
    },
    {
      id: "2",
      content: "Awesome, I'll take a look now.",
      timestamp: "2:16 PM",
      sender: "other",
      senderName: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      content:
        "I noticed you refactored the components into smaller ones. Looks cleaner!",
      timestamp: "2:20 PM",
      sender: "other",
      senderName: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      content:
        "Yep! I also optimized the image loading with `next/image`. It should improve performance on mobile.",
      timestamp: "2:21 PM",
      sender: "self",
    },
    {
      id: "5",
      content:
        "Nice. One thing — the responsive layout seems to break at 768px. Can you check?",
      timestamp: "2:25 PM",
      sender: "other",
      senderName: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      content:
        "Thanks for catching that. I think the `flex-wrap` wasn't applied properly in the navbar.",
      timestamp: "2:27 PM",
      sender: "self",
    },
    {
      id: "7",
      content:
        "Got it. Also, the dark mode toggle doesn't persist after reload.",
      timestamp: "2:30 PM",
      sender: "other",
      senderName: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "8",
      content:
        "Oh — I forgot to store the theme in `localStorage`. I'll add that now.",
      timestamp: "2:31 PM",
      sender: "self",
    },
    {
      id: "9",
      content:
        "Cool. Overall, it's looking really good. Let’s try to finalize everything before tomorrow’s demo.",
      timestamp: "2:35 PM",
      sender: "other",
      senderName: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "10",
      content: "Definitely. I’ll push one last commit and ping you again.",
      timestamp: "2:36 PM",
      sender: "self",
    },
    {
      id: "11",
      content: "Thanks! You’re doing a great job on this 🚀",
      timestamp: "2:40 PM",
      sender: "other",
      senderName: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "12",
      content: "Appreciate that 😄",
      timestamp: "2:41 PM",
      sender: "self",
    },
    {
      id: "13",
      content:
        "Quick question — do you think we should add unit tests for the sidebar toggle logic?",
      timestamp: "2:43 PM",
      sender: "other",
      senderName: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "14",
      content:
        "Yeah, good call. I’ll write a couple of tests using Vitest after the last commit.",
      timestamp: "2:44 PM",
      sender: "self",
    },
    {
      id: "15",
      content:
        "Perfect. Let’s aim to review everything by 5 PM so we’re ready for the presentation.",
      timestamp: "2:45 PM",
      sender: "other",
      senderName: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  "6": [
    {
      id: "1",
      content: "Morning! I’ve updated the pitch deck with the latest numbers.",
      timestamp: "8:15 AM",
      sender: "other",
      senderName: "Linda Park",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      content: "Great! I’ll review it before our 10 AM meeting.",
      timestamp: "8:18 AM",
      sender: "self",
    },
    {
      id: "3",
      content: "Also, I added a section about the user growth this quarter.",
      timestamp: "8:20 AM",
      sender: "other",
      senderName: "Linda Park",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      content: "Awesome! That's exactly what we needed. Thanks!",
      timestamp: "8:22 AM",
      sender: "self",
    },
  ],
  "7": [
    {
      id: "1",
      content: "Yo, call me when you’re free today.",
      timestamp: "7:45 AM",
      sender: "other",
      senderName: "Daniel Green",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      content: "Will do. After lunch okay?",
      timestamp: "8:00 AM",
      sender: "self",
    },
    {
      id: "3",
      content: "Yeah, perfect.",
      timestamp: "8:01 AM",
      sender: "other",
      senderName: "Daniel Green",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
};

// Function to get messages for a specific conversation
export function getMessages(conversationId: string): Message[] {
  return messagesData[conversationId] || [];
}
