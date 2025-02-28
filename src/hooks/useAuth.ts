import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

interface AuthOptions {
  /** Specify a required role (e.g., "ADMIN"). */
  requiredRole?: string;
  /** Path to redirect if the user is not authenticated or unauthorized. */
  redirectTo?: string;
}

/**
 * Custom hook to manage authentication state.
 * It automatically redirects unauthenticated users or those without the required role.
 */
export function useAuth({
  requiredRole,
  redirectTo = "/access-denied",
}: AuthOptions = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user ?? null;

  // Memoize the role check so that it recalculates only when 'user' or 'requiredRole' changes.
  const hasRequiredRole = useMemo(() => {
    if (!requiredRole) return true;
    return user?.role === requiredRole;
  }, [requiredRole, user]);

  useEffect(() => {
    if (isLoading) return; // Still loading; do nothing.

    if (!isAuthenticated) {
      // Not authenticated: redirect to the provided redirect path or prompt sign in.
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        signIn();
      }
      return;
    }

    // If a required role is specified and the user doesn't match, redirect.
    if (requiredRole && !hasRequiredRole) {
      router.push(redirectTo);
    }
  }, [
    isAuthenticated,
    isLoading,
    requiredRole,
    hasRequiredRole,
    router,
    redirectTo,
  ]);

  return { session, user, isAuthenticated, isLoading, hasRequiredRole };
}
