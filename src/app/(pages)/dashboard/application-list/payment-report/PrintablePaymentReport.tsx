'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { PaymentReport } from '@/utils/Interface';

interface PrintablePaymentReportProps {
  studentData: {
    studentName?: string;
    course?: string;
    fullAddress?: string;
    mobileNumber?: string;
    email?: string;
    image?: string;
  };
  paymentsData: PaymentReport[];
}

const PrintablePaymentReport = forwardRef<
  HTMLDivElement,
  PrintablePaymentReportProps
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
    <div ref={ref} className='print-container'>
      {/* Print Styles */}
      <style jsx>{`
          @media print {
            .print-container {
              padding: 20px;
              font-size: 12px;
              line-height: 1.4;
              color: #000;
              background: white;
            }
            
            .print-header {
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            
            .print-title {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
              margin: 0;
            }
            
            .print-subtitle {
              font-size: 14px;
              color: #6b7280;
              margin: 5px 0 0 0;
            }
            
            .student-info-print {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 30px;
            }
            
            .student-details {
              display: flex;
              gap: 20px;
              align-items: flex-start;
            }
            
            .student-image {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              border: 2px solid #e5e7eb;
              object-fit: cover;
            }
            
            .student-info-text h2 {
              font-size: 18px;
              font-weight: bold;
              margin: 0 0 5px 0;
              color: #1f2937;
            }
            
            .student-info-text p {
              font-size: 14px;
              color: #6b7280;
              margin: 0 0 15px 0;
            }
            
            .contact-info {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            
            .contact-item {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 12px;
              color: #4b5563;
            }
            
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin-bottom: 30px;
            }
            
            .stat-card {
              background: white;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 15px;
              text-align: center;
            }
            
            .stat-title {
              font-size: 12px;
              color: #6b7280;
              margin-bottom: 8px;
              font-weight: 500;
            }
            
            .stat-value {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 4px;
            }
            
            .stat-description {
              font-size: 10px;
              color: #9ca3af;
            }
            
            .payments-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            
            .payments-table th,
            .payments-table td {
              border: 1px solid #e5e7eb;
              padding: 8px 12px;
              text-align: left;
            }
            
            .payments-table th {
              background: #f9fafb;
              font-weight: 600;
              font-size: 11px;
              color: #374151;
            }
            
            .payments-table td {
              font-size: 11px;
              color: #1f2937;
            }
            
            .amount-positive {
              color: #059669;
              font-weight: 600;
            }
            
            .amount-negative {
              color: #dc2626;
              font-weight: 600;
            }
            
            .table-footer {
              background: #f3f4f6;
              font-weight: bold;
            }
            
            .section-title {
              font-size: 16px;
              font-weight: bold;
              color: #1f2937;
              margin: 30px 0 15px 0;
              padding-bottom: 8px;
              border-bottom: 1px solid #e5e7eb;
            }
            
            .print-footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              font-size: 10px;
              color: #9ca3af;
            }
          }
          
          @page {
            margin: 0.5in;
            size: A4;
          }
        `}</style>

      {/* Header */}
      <div className='print-header'>
        <h1 className='print-title'>Payment Report</h1>
        <p className='print-subtitle'>
          Generated on {format(new Date(), 'PPP')} at {format(new Date(), 'p')}
        </p>
      </div>

      {/* Student Information */}
      <div className='student-info-print'>
        <h2 className='section-title'>Student Information</h2>
        <div className='student-details'>
          {studentData.image && (
            <Image
              src={studentData.image || '/placeholder.svg'}
              alt={studentData.studentName || 'Student'}
              width={80}
              height={80}
              className='student-image'
            />
          )}
          <div className='student-info-text'>
            {studentData.studentName && <h2>{studentData.studentName}</h2>}
            {studentData.course && <p>{studentData.course}</p>}
            <div className='contact-info'>
              {studentData.fullAddress && (
                <div className='contact-item'>
                  <span>📍</span>
                  <span>{studentData.fullAddress}</span>
                </div>
              )}
              {studentData.mobileNumber && (
                <div className='contact-item'>
                  <span>📞</span>
                  <span>{studentData.mobileNumber}</span>
                </div>
              )}
              {studentData.email && (
                <div className='contact-item'>
                  <span>✉</span>
                  <span>{studentData.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Statistics */}
      <h2 className='section-title'>Payment Summary</h2>
      <div className='stats-grid'>
        <div className='stat-card'>
          <div className='stat-title'>Total Balance</div>
          <div
            className={cn(
              'stat-value',
              totalAmount >= 0 ? 'amount-positive' : 'amount-negative',
            )}
          >
            ৳ {totalAmount.toLocaleString()}
          </div>
          <div className='stat-description'>
            From {paymentsData.length} transactions
          </div>
        </div>
        <div className='stat-card'>
          <div className='stat-title'>Total Received</div>
          <div className='stat-value amount-positive'>
            ৳ {totalPositive.toLocaleString()}
          </div>
          <div className='stat-description'>
            {positivePayments.length} incoming payments
          </div>
        </div>
        <div className='stat-card'>
          <div className='stat-title'>Total Refunded</div>
          <div className='stat-value amount-negative'>
            ৳ {Math.abs(totalNegative).toLocaleString()}
          </div>
          <div className='stat-description'>
            {negativePayments.length} refund transactions
          </div>
        </div>
      </div>

      {/* Payment History */}
      <h2 className='section-title'>Payment History</h2>
      <table className='payments-table'>
        <thead>
          <tr>
            <th>Receive Date</th>
            <th>Payment Month</th>
            <th>Comment</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedPayments.map((payment) => (
            <tr key={payment.id}>
              <td>
                {format(new Date(payment.paymentReceiveDate), 'dd MMM yyyy')}
              </td>
              <td>{format(new Date(payment.paymentMonth), 'MMMM yyyy')}</td>
              <td>{payment.comment}</td>
              <td
                className={cn(
                  payment.amount > 0 ? 'amount-positive' : 'amount-negative',
                )}
                style={{ textAlign: 'right' }}
              >
                ৳ {payment.amount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className='table-footer'>
            <td colSpan={3}>Total Balance</td>
            <td
              className={cn(
                totalAmount > 0 ? 'amount-positive' : 'amount-negative',
              )}
              style={{ textAlign: 'right' }}
            >
              ৳ {totalAmount.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Footer */}
      <div className='print-footer'>
        <p>This is a computer-generated payment report.</p>
        <p>Report generated from Payment Management System</p>
      </div>
    </div>
  );
});

PrintablePaymentReport.displayName = 'PrintablePaymentReport';

export default PrintablePaymentReport;
