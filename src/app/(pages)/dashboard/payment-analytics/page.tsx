'use client';

import { useAuth } from '@/hooks/useAuth';
import PaymentAnalytics from './PaymentAnalytics';
import PaymentSkeleton from './PaymentSkeleton';

/**
 * Payment Analytics Page
 *
 * Entry point for the payment analytics dashboard
 */
export default function PaymentAnalyticsPage() {
  const { isLoading, isAuthenticated, hasRequiredRole } = useAuth({
    requiredRole: 'ADMIN', // Only allow admins to access
    redirectTo: '/access-denied', // Redirect to an access-denied page if not authorized
  });

  if (isLoading) {
    return <PaymentSkeleton />;
  }

  if (!isAuthenticated || !hasRequiredRole) {
    return null; // Will not render if user is not authenticated or not an admin
  }

  // If user is authorized, render the analytics component
  return <PaymentAnalytics />;
}
