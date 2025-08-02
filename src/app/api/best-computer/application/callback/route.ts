import { type NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/components/helper/prisma/Prisma';
import { bkashConfig } from '@/lib/bkash';
import { executePayment, queryPayment } from '@/services/bkash';
import cloudinary from '@/utils/cloudinary';

const myUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const paymentID = searchParams.get('paymentID');
  const status = searchParams.get('status');
  const applicationId = searchParams.get('applicationId');

  if (status === 'cancel' || status === 'failure') {
    if (applicationId) {
      const pendingApplication = await Prisma.pendingApplication.findUnique({
        where: { id: applicationId },
      });

      if (pendingApplication?.imageId) {
        await cloudinary.uploader.destroy(pendingApplication.imageId);
      }

      await Prisma.pendingApplication.delete({
        where: { id: applicationId },
      });
    }

    return NextResponse.redirect(`${myUrl}/payment?status=${status}`);
  }

  if (!paymentID) {
    return NextResponse.redirect(`${myUrl}/payment?status=failure`);
  }

  try {
    const executePaymentResponse = await executePayment(bkashConfig, paymentID);

    if (executePaymentResponse.statusCode !== '0000') {
      return NextResponse.redirect(
        `${myUrl}/payment?status=failure&message=${executePaymentResponse.statusMessage}`,
      );
    }

    const queryPaymentResponse = await queryPayment(bkashConfig, paymentID);

    if (queryPaymentResponse.statusCode !== '0000') {
      return NextResponse.redirect(
        `${myUrl}/payment?status=failure&message=${queryPaymentResponse.statusMessage}`,
      );
    }

    if (queryPaymentResponse.transactionStatus === 'Completed') {
      const pendingApplication = await Prisma.pendingApplication.findUnique({
        where: { id: applicationId as string },
      });

      if (!pendingApplication) {
        return NextResponse.redirect(
          `${myUrl}/payment?status=failure&message=Application not found`,
        );
      }

      let roll = 2000;
      const lastApplication = await Prisma.application.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { roll: true },
      });

      if (lastApplication?.roll) {
        roll = lastApplication.roll + 1;
      }

      await Prisma.application.create({
        data: {
          studentName: pendingApplication.studentName,
          fatherName: pendingApplication.fatherName,
          motherName: pendingApplication.motherName,
          birthDay: pendingApplication.birthDay,
          bloodGroup: pendingApplication.bloodGroup,
          mobileNumber: pendingApplication.mobileNumber,
          guardianNumber: pendingApplication.guardianNumber,
          gender: pendingApplication.gender,
          religion: pendingApplication.religion,
          fullAddress: pendingApplication.fullAddress,
          district: pendingApplication.district,
          education: pendingApplication.education,
          board: pendingApplication.board,
          rollNumber: pendingApplication.rollNumber,
          regNumber: pendingApplication.regNumber,
          passingYear: pendingApplication.passingYear,
          gpa: pendingApplication.gpa,
          nid: pendingApplication.nid,
          nationality: pendingApplication.nationality,
          course: pendingApplication.course,
          duration: pendingApplication.duration,
          email: pendingApplication.email,
          pc: pendingApplication.pc,
          userId: pendingApplication.userId,
          roll: roll,
          transactionId: queryPaymentResponse.trxID,
          fatherOccupation: pendingApplication.fatherOccupation,
          maritalStatus: pendingApplication.maritalStatus,
          session: pendingApplication.session,
          image: pendingApplication.image,
          imageId: pendingApplication.imageId,
          status: 'Pending',
          certificate: 'Pending',
          applicationFee: 'Paid',
          applicationFeeAmount: 100,
          metadata: {
            paymentSuccess: true,
            paymentMethod: 'BKASH',
            bkashPaymentID: paymentID,
            trxID: queryPaymentResponse.trxID,
          },
        },
      });

      await Prisma.pendingApplication.delete({
        where: { id: applicationId as string },
      });

      return NextResponse.redirect(
        `${myUrl}/payment?status=success&trxID=${queryPaymentResponse.trxID}`,
      );
    }
    // biome-ignore lint: error
  } catch (error) {
    return NextResponse.redirect(
      `${myUrl}/payment?status=failure&message=An unexpected error occurred`,
    );
  }
}
