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
    duration?: string;
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
      className='print:p-6 print:text-black print:bg-white print:font-sans print:text-sm print:leading-normal print:max-w-none'
    >
      {/* Header */}
      <div className='print:text-center print:border-b-2 print:border-gray-800 print:pb-4 print:mb-6'>
        <h1 className='print:text-2xl print:font-bold print:mb-1 print:text-gray-800'>
          Oylkka IT & Training Center
        </h1>
        <h2 className='print:text-lg print:font-semibold print:mb-2 print:text-gray-700'>
          Payment Report
        </h2>
        <p className='print:text-xs print:text-gray-600'>
          Generated on {format(new Date(), 'MMMM dd, yyyy')}
        </p>
      </div>

      {/* Student Information */}
      <div className='print:border print:border-gray-300 print:rounded print:p-4 print:mb-6'>
        <h3 className='print:text-sm print:font-bold print:text-gray-800 print:mb-3 print:border-b print:border-gray-200 print:pb-1'>
          Student Information
        </h3>

        <div className='print:flex print:gap-4 print:items-start'>
          {/* Student Image */}
          {studentData.image && (
            <div className='print:flex-shrink-0'>
              <Image
                src={studentData.image || '/placeholder.svg'}
                alt={studentData.studentName || 'Student'}
                width={70}
                height={70}
                priority={true}
                unoptimized={true}
                className='print:w-16 print:h-16 print:rounded print:border print:border-gray-300 print:object-cover'
                style={{
                  width: '64px',
                  height: '64px',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}

          {/* Student Details */}
          <div className='print:flex-1'>
            {studentData.studentName && (
              <h4 className='print:text-base print:font-bold print:mb-2 print:text-gray-800'>
                {studentData.studentName}
              </h4>
            )}

            <div className='print:grid print:grid-cols-2 print:gap-x-4 print:gap-y-1 print:text-xs'>
              {studentData.fullAddress && (
                <div className='print:col-span-1 print:mt-1'>
                  <span className='print:font-semibold print:text-gray-600'>
                    Address:
                  </span>{' '}
                  <span className='print:text-gray-800'>
                    {studentData.fullAddress}
                  </span>
                </div>
              )}
              {studentData.course && (
                <div>
                  <span className='print:font-semibold print:text-gray-600'>
                    Course:
                  </span>{' '}
                  <span className='print:text-gray-800'>
                    {studentData.course}
                  </span>
                </div>
              )}

              {studentData.duration && (
                <div>
                  <span className='print:font-semibold print:text-gray-600'>
                    Duration:
                  </span>{' '}
                  <span className='print:text-gray-800'>
                    {studentData.duration}
                  </span>
                </div>
              )}

              {studentData.mobileNumber && (
                <div>
                  <span className='print:font-semibold print:text-gray-600'>
                    Phone:
                  </span>{' '}
                  <span className='print:text-gray-800'>
                    {studentData.mobileNumber}
                  </span>
                </div>
              )}

              {studentData.email && (
                <div>
                  <span className='print:font-semibold print:text-gray-600'>
                    Email:
                  </span>{' '}
                  <span className='print:text-gray-800'>
                    {studentData.email}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className='print:mb-6'>
        <h3 className='print:text-sm print:font-bold print:text-gray-800 print:mb-3 print:border-b print:border-gray-200 print:pb-1'>
          Payment Summary
        </h3>

        <div className='print:grid print:grid-cols-3 print:gap-4'>
          <div className='print:border print:border-gray-300 print:rounded print:p-3 print:text-center'>
            <div className='print:text-xs print:text-gray-600 print:mb-1 print:font-semibold'>
              Total Balance
            </div>
            <div
              className={cn(
                'print:text-lg print:font-bold',
                totalAmount >= 0
                  ? 'print:text-green-600'
                  : 'print:text-red-600',
              )}
            >
              ৳ {totalAmount.toLocaleString()}
            </div>
            <div className='print:text-xs print:text-gray-500'>
              {paymentsData.length} transactions
            </div>
          </div>

          <div className='print:border print:border-gray-300 print:rounded print:p-3 print:text-center'>
            <div className='print:text-xs print:text-gray-600 print:mb-1 print:font-semibold'>
              Total Received
            </div>
            <div className='print:text-lg print:font-bold print:text-green-600'>
              ৳ {totalPositive.toLocaleString()}
            </div>
            <div className='print:text-xs print:text-gray-500'>
              {positivePayments.length} payments
            </div>
          </div>

          <div className='print:border print:border-gray-300 print:rounded print:p-3 print:text-center'>
            <div className='print:text-xs print:text-gray-600 print:mb-1 print:font-semibold'>
              Total Refunded
            </div>
            <div className='print:text-lg print:font-bold print:text-red-600'>
              ৳ {Math.abs(totalNegative).toLocaleString()}
            </div>
            <div className='print:text-xs print:text-gray-500'>
              {negativePayments.length} refunds
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className='print:mb-6'>
        <h3 className='print:text-sm print:font-bold print:text-gray-800 print:mb-3 print:border-b print:border-gray-200 print:pb-1'>
          Payment History
        </h3>

        <div className='print:border print:border-gray-300 print:rounded print:overflow-hidden'>
          <table className='print:w-full print:border-collapse print:text-xs'>
            <thead>
              <tr className='print:bg-gray-100'>
                <th className='print:border-b print:border-gray-300 print:p-2 print:text-left print:font-semibold print:text-gray-800'>
                  Date
                </th>
                <th className='print:border-b print:border-gray-300 print:p-2 print:text-left print:font-semibold print:text-gray-800'>
                  Month
                </th>
                <th className='print:border-b print:border-gray-300 print:p-2 print:text-left print:font-semibold print:text-gray-800'>
                  Comment
                </th>
                <th className='print:border-b print:border-gray-300 print:p-2 print:text-right print:font-semibold print:text-gray-800'>
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
                  <td className='print:border-b print:border-gray-200 print:p-2 print:text-gray-800'>
                    {format(new Date(payment.paymentReceiveDate), 'dd/MM/yyyy')}
                  </td>
                  <td className='print:border-b print:border-gray-200 print:p-2 print:text-gray-800'>
                    {format(new Date(payment.paymentMonth), 'MMM yyyy')}
                  </td>
                  <td className='print:border-b print:border-gray-200 print:p-2 print:text-gray-800'>
                    {payment.comment}
                  </td>
                  <td
                    className={cn(
                      'print:border-b print:border-gray-200 print:p-2 print:text-right print:font-semibold',
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
                  className='print:border-t print:border-gray-400 print:p-2 print:font-bold print:text-gray-800'
                >
                  Total Balance
                </td>
                <td
                  className={cn(
                    'print:border-t print:border-gray-400 print:p-2 print:text-right print:font-bold',
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
      </div>

      {/* Footer */}
      <div className='print:mt-8 print:pt-4 print:border-t print:border-gray-300 print:flex print:justify-end'>
        <div className='print:text-right print:text-xs print:text-gray-800'>
          <div className='print:mb-12'>{/* Space for signature */}</div>
          <div className='print:border-t print:border-gray-400 print:pt-2 print:px-6'>
            <p className='print:font-semibold'>Director's Signature</p>
          </div>
        </div>
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
    onBeforePrint: () => {
      // Small delay to ensure images are loaded
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
    },
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
