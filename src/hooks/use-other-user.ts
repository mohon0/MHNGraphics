"use client";

import type { FullConversationType } from "@/types";
import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (
  conversation: FullConversationType | { users: User[] },
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    if (!currentUserEmail) {
      return conversation.users[0];
    }

    const otherUsers = conversation.users.filter(
      (user) => user.email !== currentUserEmail,
    );

    return otherUsers[0];
  }, [session.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
