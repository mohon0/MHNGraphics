'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import AdminDashboard from './(admin-dashboard)/Admin-Dashboard';
import UserDashboard from './User-Dashboard';

export default function Dashboard() {
  // Use our custom hook with a redirect option for unauthenticated users.
  const { isLoading, user } = useAuth({ redirectTo: '/sign-in' });

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Skeleton />
      </div>
    );
  }

  // At this point, the user is authenticated. Render based on user role.
  return user?.role === 'ADMIN' ? <AdminDashboard /> : <UserDashboard />;
}
