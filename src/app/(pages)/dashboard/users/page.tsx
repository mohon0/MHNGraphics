'use client';

import { Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AccessDenied } from './empty-state';
import TableSkeleton from './TableSkeleton';
import { UsersList } from './users-list';

// Update the UsersPage component with a more modern design for the access denied state
export default function UsersPage() {
  const { isLoading, user, hasRequiredRole } = useAuth({
    requiredRole: 'ADMIN',
  });

  // Display a loading state while authentication is in progress
  if (isLoading) {
    return <TableSkeleton rowCount={20} />;
  }

  // Although the hook should redirect unauthorized users,
  // include an extra safeguard fallback
  if (!user || !hasRequiredRole) {
    return <AccessDenied />;
  }

  return (
    <Suspense fallback={<TableSkeleton rowCount={10} />}>
      <UsersList />
    </Suspense>
  );
}
