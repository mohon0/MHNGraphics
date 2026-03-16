import axios from 'axios';
import { type NextRequest, NextResponse } from 'next/server';
import { sendSMS } from '@/lib/sms';

export async function POST(req: NextRequest) {
  const { phone, message } = await req.json();

  if (!phone || !message) {
    return NextResponse.json(
      { error: 'Phone and message are required' },
      { status: 400 },
    );
  }

  try {
    const data = await sendSMS(phone, message);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json({ error: 'Failed to send SMS' }, { status: 500 });
  }
}
