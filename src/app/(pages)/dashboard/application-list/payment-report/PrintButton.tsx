'use client';

import { format } from 'date-fns';
import { Printer } from 'lucide-react';
import Image from 'next/image';
import { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PaymentReport } from '@/utils/Interface';

interface PrintButtonProps {
  studentData: {
    studentName?: string;
    course?: string;
    fullAddress?: string;
    mobileNumber?: string;
    email?: string;
    image?: string;
  };
  paymentsData: PaymentReport[];
  disabled?: boolean;
}

const PrintablePaymentReport = forwardRef<
  HTMLDivElement,
  {
    studentData: PrintButtonProps['studentData'];
    paymentsData: PaymentReport[];
  }
>(({ studentData, paymentsData }, ref) => {
  // Calculate statistics
  const totalAmount = paymentsData.reduce(
    (acc, payment) => acc + payment.amount,
    0,
  );
  const positivePayments = paymentsData.filter((p) => p.amount > 0);
  const negativePayments = paymentsData.filter((p) => p.amount < 0);
  const totalPositive = positivePayments.reduce((acc, p) => acc + p.amount, 0);
  const totalNegative = negativePayments.reduce((acc, p) => acc + p.amount, 0);

  // Sort payments by date
  const sortedPayments = [...paymentsData].sort(
    (a, b) =>
      new Date(b.paymentReceiveDate).getTime() -
      new Date(a.paymentReceiveDate).getTime(),
  );

  return (
    <div
      ref={ref}
      className='print:p-6 print:text-black print:bg-white print:font-sans print:text-sm print:leading-relaxed'
    >
      {/* Header */}
      <div className='print:text-center print:border-b-2 print:border-gray-800 print:pb-5 print:mb-8'>
        <h1 className='print:text-3xl print:font-bold print:mb-2 print:text-gray-800'>
          Best Computer Training Center
        </h1>
        <h2 className='print:text-2xl print:font-bold print:mb-2 print:text-gray-800'>
          Payment Report
        </h2>
        <p className='print:text-sm print:text-gray-600'>
          Generated on {format(new Date(), 'MMMM dd, yyyy')}
        </p>
      </div>

      {/* Student Information */}
      <div className='print:bg-gray-50 print:border print:border-gray-300 print:rounded-lg print:p-5 print:mb-8'>
        <h2 className='print:text-lg print:font-bold print:text-gray-800 print:mb-4 print:pb-2 print:border-b print:border-gray-300'>
          Student Information
        </h2>
        <div className='print:flex print:gap-5 print:items-start'>
          {studentData.image && (
            <Image
              src={studentData.image || '/placeholder.svg'}
              alt={studentData.studentName || 'Student'}
              width={80}
              height={80}
              className='print:w-20 print:h-20 print:rounded-lg print:border-2 print:border-gray-300 print:object-cover print:flex-shrink-0'
            />
          )}
          <div className='print:flex-1'>
            {studentData.studentName && (
              <h3 className='print:text-lg print:font-bold print:mb-1 print:text-gray-800'>
                {studentData.studentName}
              </h3>
            )}
            {studentData.course && (
              <p className='print:text-sm print:text-gray-600 print:mb-4'>
                {studentData.course}
              </p>
            )}
            <div className='print:space-y-2'>
              {studentData.fullAddress && (
                <div className='print:text-xs print:text-gray-700'>
                  <span className='print:font-semibold'>Address:</span>{' '}
                  {studentData.fullAddress}
                </div>
              )}
              {studentData.mobileNumber && (
                <div className='print:text-xs print:text-gray-700'>
                  <span className='print:font-semibold'>Phone:</span>{' '}
                  {studentData.mobileNumber}
                </div>
              )}
              {studentData.email && (
                <div className='print:text-xs print:text-gray-700'>
                  <span className='print:font-semibold'>Email:</span>{' '}
                  {studentData.email}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <h2 className='print:text-lg print:font-bold print:text-gray-800 print:mb-4 print:pb-2 print:border-b print:border-gray-300'>
        Payment Summary
      </h2>
      <div className='print:grid print:grid-cols-3 print:gap-5 print:mb-8'>
        <div className='print:bg-white print:border print:border-gray-300 print:rounded-md print:p-4 print:text-center'>
          <div className='print:text-xs print:text-gray-600 print:mb-2 print:font-bold print:uppercase'>
            Total Balance
          </div>
          <div
            className={cn(
              'print:text-xl print:font-bold print:mb-1',
              totalAmount >= 0 ? 'print:text-green-600' : 'print:text-red-600',
            )}
          >
            ৳ {totalAmount.toLocaleString()}
          </div>
          <div className='print:text-xs print:text-gray-500'>
            {paymentsData.length} transactions
          </div>
        </div>
        <div className='print:bg-white print:border print:border-gray-300 print:rounded-md print:p-4 print:text-center'>
          <div className='print:text-xs print:text-gray-600 print:mb-2 print:font-bold print:uppercase'>
            Total Received
          </div>
          <div className='print:text-xl print:font-bold print:mb-1 print:text-green-600'>
            ৳ {totalPositive.toLocaleString()}
          </div>
          <div className='print:text-xs print:text-gray-500'>
            {positivePayments.length} payments
          </div>
        </div>
        <div className='print:bg-white print:border print:border-gray-300 print:rounded-md print:p-4 print:text-center'>
          <div className='print:text-xs print:text-gray-600 print:mb-2 print:font-bold print:uppercase'>
            Total Refunded
          </div>
          <div className='print:text-xl print:font-bold print:mb-1 print:text-red-600'>
            ৳ {Math.abs(totalNegative).toLocaleString()}
          </div>
          <div className='print:text-xs print:text-gray-500'>
            {negativePayments.length} refunds
          </div>
        </div>
      </div>

      {/* Payment History */}
      <h2 className='print:text-lg print:font-bold print:text-gray-800 print:mb-4 print:pb-2 print:border-b print:border-gray-300'>
        Payment History
      </h2>
      <div className='print:border print:border-gray-300 print:rounded-lg print:overflow-hidden'>
        <table className='print:w-full print:border-collapse'>
          <thead>
            <tr className='print:bg-gray-100'>
              <th className='print:border print:border-gray-300 print:p-3 print:text-left print:font-bold print:text-xs print:text-gray-800'>
                Date
              </th>
              <th className='print:border print:border-gray-300 print:p-3 print:text-left print:font-bold print:text-xs print:text-gray-800'>
                Month
              </th>
              <th className='print:border print:border-gray-300 print:p-3 print:text-left print:font-bold print:text-xs print:text-gray-800'>
                Comment
              </th>
              <th className='print:border print:border-gray-300 print:p-3 print:text-right print:font-bold print:text-xs print:text-gray-800'>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPayments.map((payment, index) => (
              <tr
                key={payment.id}
                className={
                  index % 2 === 0 ? 'print:bg-white' : 'print:bg-gray-50'
                }
              >
                <td className='print:border print:border-gray-300 print:p-3 print:text-xs print:text-gray-800'>
                  {format(new Date(payment.paymentReceiveDate), 'dd/MM/yyyy')}
                </td>
                <td className='print:border print:border-gray-300 print:p-3 print:text-xs print:text-gray-800'>
                  {format(new Date(payment.paymentMonth), 'MMM yyyy')}
                </td>
                <td className='print:border print:border-gray-300 print:p-3 print:text-xs print:text-gray-800'>
                  {payment.comment}
                </td>
                <td
                  className={cn(
                    'print:border print:border-gray-300 print:p-3 print:text-right print:text-xs print:font-bold',
                    payment.amount > 0
                      ? 'print:text-green-600'
                      : 'print:text-red-600',
                  )}
                >
                  ৳ {payment.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className='print:bg-gray-200'>
              <td
                colSpan={3}
                className='print:border print:border-gray-300 print:p-3 print:font-bold print:text-xs print:text-gray-800'
              >
                Total Balance
              </td>
              <td
                className={cn(
                  'print:border print:border-gray-300 print:p-3 print:text-right print:font-bold print:text-xs',
                  totalAmount > 0
                    ? 'print:text-green-600'
                    : 'print:text-red-600',
                )}
              >
                ৳ {totalAmount.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Footer */}
      <div className='print:mt-10 print:pt-5 print:border-t print:border-gray-300 print:text-center print:text-xs print:text-gray-600'>
        <p>This is a computer-generated payment report.</p>
      </div>
    </div>
  );
});

PrintablePaymentReport.displayName = 'PrintablePaymentReport';

export default function PrintButton({
  studentData,
  paymentsData,
  disabled,
}: PrintButtonProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Payment Report - ${studentData.studentName || 'Student'}`,
  });

  return (
    <>
      <Button
        onClick={() => handlePrint()}
        variant='outline'
        size='sm'
        disabled={disabled || !paymentsData?.length}
        className='gap-2 bg-transparent'
      >
        <Printer className='h-4 w-4' />
        Print Report
      </Button>

      {/* Hidden printable component */}
      <div style={{ display: 'none' }}>
        <PrintablePaymentReport
          studentData={studentData}
          paymentsData={paymentsData}
          ref={printRef}
        />
      </div>
    </>
  );
}
