'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PaymentReport } from '@/utils/Interface';
import { format } from 'date-fns';
import { Printer } from 'lucide-react';
import { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

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
  const totalAmount = paymentsData.reduce((acc, p) => acc + p.amount, 0);

  const sortedPayments = [...paymentsData].sort(
    (a, b) =>
      new Date(b.paymentReceiveDate).getTime() -
      new Date(a.paymentReceiveDate).getTime(),
  );

  return (
    <div
      ref={ref}
      style={{ width: '148mm', minHeight: '210mm' }}
      className='print:p-6 print:text-black print:bg-white'
    >
      {/* Header Section */}
      <div className='print:flex print:justify-between print:items-start print:border-b-2 print:border-black print:pb-3 print:mb-4'>
        <div>
          <h1 className='print:text-xl print:font-black print:tracking-tighter print:uppercase'>
            Oylkka IT & Training Center
          </h1>
        </div>
        <div className='print:text-right'>
          <p className='print:text-xs print:font-bold'>DATE</p>
          <p className='print:text-xs'>{format(new Date(), 'dd MMM, yyyy')}</p>
        </div>
      </div>

      {/* Student Profile Card */}
      <div className='print:flex print:gap-4 print:mb-6 print:bg-gray-50 print:p-3 print:rounded-lg print:border print:border-gray-200'>
        {studentData.image && (
          <div className='print:w-20 print:h-20 print:border-2 print:border-white print:shadow-sm print:rounded-md print:overflow-hidden print:bg-white'>
            {/** biome-ignore lint/performance/noImgElement: This is fine */}
            <img
              src={studentData.image}
              alt='Student'
              className='print:w-full print:h-full print:object-cover'
            />
          </div>
        )}
        <div className='print:flex-1 print:grid print:grid-cols-2 print:gap-x-4 print:gap-y-1 print:text-[11px]'>
          <div className='print:col-span-2 print:mb-1'>
            <h2 className='print:text-sm print:font-bold print:text-gray-900'>
              {studentData.studentName}
            </h2>
          </div>
          <p>
            <span className='print:text-gray-500'>Course:</span>{' '}
            <span className='print:font-semibold'>{studentData.course}</span>
          </p>
          {studentData.mobileNumber && (
            <p>
              <span className='print:text-gray-500'>Phone:</span>{' '}
              <span className='print:font-semibold'>
                {studentData.mobileNumber}
              </span>
            </p>
          )}
          {studentData.email && (
            <p className='print:col-span-2'>
              <span className='print:text-gray-500'>Email:</span>{' '}
              <span className='print:font-semibold'>{studentData.email}</span>
            </p>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className='print:mb-6'>
        <table className='print:w-full print:text-[11px]'>
          <thead>
            <tr className='print:bg-gray-900 print:text-white'>
              <th className='print:py-2 print:px-2 print:text-left print:rounded-l-md'>
                Date
              </th>
              <th className='print:py-2 print:px-2 print:text-left'>
                Month For
              </th>
              <th className='print:py-2 print:px-2 print:text-right print:rounded-r-md'>
                Amount
              </th>
            </tr>
          </thead>
          <tbody className='print:divide-y print:divide-gray-100'>
            {sortedPayments.map((payment) => (
              <tr key={payment.id}>
                <td className='print:py-2 print:px-2'>
                  {format(new Date(payment.paymentReceiveDate), 'dd/MM/yyyy')}
                </td>
                <td className='print:py-2 print:px-2'>
                  {format(new Date(payment.paymentMonth), 'MMMM yyyy')}
                </td>
                <td
                  className={cn(
                    'print:py-2 print:px-2 print:text-right print:font-bold print:font-mono',
                    payment.amount < 0
                      ? 'print:text-red-600'
                      : 'print:text-gray-900',
                  )}
                >
                  ৳{payment.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={2}
                className='print:pt-4 print:px-2 print:text-right print:font-bold print:text-xs'
              >
                NET BALANCE
              </td>
              <td className='print:pt-4 print:px-2 print:text-right'>
                <span className='print:text-sm print:font-black print:border-b-4 print:border-double print:border-black'>
                  ৳{totalAmount.toLocaleString()}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Footer / Signatures */}
      <div className='print:mt-auto print:pt-12 print:grid print:grid-cols-2 print:gap-12 print:text-[10px]'>
        <div className='print:text-center'>
          <div className='print:border-t print:border-gray-400 print:pt-2'>
            <p className='print:font-medium'>Student's Signature</p>
          </div>
        </div>
        <div className='print:text-center'>
          <div className='print:border-t print:border-black print:pt-2'>
            <p className='print:font-bold print:uppercase tracking-widest'>
              Authorized Office
            </p>
            <p className='print:text-[8px] print:text-gray-400'>
              Oylkka IT & Training
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Corner Label */}
      <div className='print:fixed print:bottom-4 print:left-6 print:text-[8px] print:text-gray-400 print:uppercase'>
        System Generated Document
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
    documentTitle: `Statement_${studentData.studentName?.replace(/\s+/g, '_')}`,
  });

  return (
    <>
      <Button
        onClick={() => handlePrint()}
        variant='outline'
        size='sm'
        disabled={disabled || !paymentsData?.length}
        className='gap-2 border-primary/20 hover:bg-primary/5'
      >
        <Printer className='h-4 w-4' />
        Print Report
      </Button>

      {/* Hidden container for print content */}
      <div className='hidden'>
        <PrintablePaymentReport
          studentData={studentData}
          paymentsData={paymentsData}
          ref={printRef}
        />
      </div>
    </>
  );
}
