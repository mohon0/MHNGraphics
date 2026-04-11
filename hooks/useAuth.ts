import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';

interface AuthOptions {
  // Now accepts a string or an array of strings
  requiredRole?: string | string[];
  redirectTo?: string;
}

export function useAuth({
  requiredRole,
  redirectTo = '/access-denied',
}: AuthOptions = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const user = session?.user ?? null;

  const hasRequiredRole = useMemo(() => {
    if (!requiredRole) return true;

    // If it's an array, check if user.role is in it. If string, do direct check.
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user?.role as string);
    }

    return user?.role === requiredRole;
  }, [requiredRole, user]);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (requiredRole && !hasRequiredRole) {
      router.push(redirectTo);
    }
  }, [
    isAuthenticated,
    isLoading,
    hasRequiredRole,
    router,
    redirectTo,
    requiredRole,
  ]);

  return { session, user, isAuthenticated, isLoading, hasRequiredRole };
}
