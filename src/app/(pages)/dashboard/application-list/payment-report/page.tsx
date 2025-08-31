'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Suspense, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchPaymentReport } from '@/services/payment';
import DeletePaymentSummary from './DeletePaymentSummary';
import PaymentForm from './PaymentForm';
import { PaymentSummaryTable } from './PaymentSummaryTable';
import PrintButton from './PrintButton';
import StudentInfo from './StudentInfo';

function PaymentPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { data: session, status } = useSession();
  const router = useRouter();

  // Fetch payment data for print functionality
  const { data: paymentData, isLoading: isPaymentLoading } =
    useFetchPaymentReport(id || '');

  useEffect(() => {
    // Check if the session is loaded and if the user is an admin
    if (status === 'loading') return; // Wait for session to load
    if (!session || session.user?.role !== 'ADMIN') {
      // Redirect to home or any other page
      router.push('/'); // Customize this as needed
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className='text-center'>
        <Skeleton className='h-10 w-full' />
      </div>
    );
  }

  return (
    <div className='mx-auto mt-2 flex w-full flex-col items-center justify-center gap-8'>
      {/* Print Button - positioned at the top */}
      <div className='flex w-full max-w-7xl justify-end px-4'>
        <PrintButton
          studentData={{
            studentName: paymentData?.studentName,
            course: paymentData?.course,
            fullAddress: paymentData?.fullAddress,
            mobileNumber: paymentData?.mobileNumber,
            email: paymentData?.email,
            image: paymentData?.image,
            duration: paymentData?.duration,
          }}
          paymentsData={paymentData?.payments || []}
          disabled={isPaymentLoading || !paymentData?.payments?.length}
        />
      </div>

      {/* Main Content Grid */}
      <div className='w-full print:hidden max-w-7xl md:grid md:grid-cols-12 md:gap-8 space-y-8 md:space-y-0 px-4'>
        <div className='col-span-5 space-y-8'>
          <StudentInfo id={id} />
          <PaymentForm id={id || ''} />
        </div>
        <div className='col-span-7 space-y-8'>
          <PaymentSummaryTable id={id || ''} />
          <DeletePaymentSummary id={id || ''} />
        </div>
      </div>
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense
      fallback={
        <div className='text-center'>
          <Skeleton className='h-10 w-full' />
        </div>
      }
    >
      <PaymentPage />
    </Suspense>
  );
}
