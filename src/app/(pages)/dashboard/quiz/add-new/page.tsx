'use client';
import { useAuth } from '@/hooks/useAuth';
import { QuizForm } from './new-quize';

export default function NewQuiz() {
  const { isLoading, isAuthenticated, hasRequiredRole } = useAuth({
    requiredRole: 'ADMIN', // Only allow admins to access
    redirectTo: '/access-denied', // Redirect to an access-denied page if not authorized
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated || !hasRequiredRole) {
    return null; // Will not render if user is not authenticated or not an admin
  }

  // If user is authorized, render the analytics component
  return (
    <div>
      <QuizForm />
    </div>
  );
}
