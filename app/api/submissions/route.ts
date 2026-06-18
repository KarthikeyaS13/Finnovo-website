import { NextResponse } from 'next/server';
import { addSubmission, getSubmissions, deleteSubmission } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, companyName, workEmail, phoneNumber, primaryInterest, messageDetails } = body;
    
    if (!fullName || !companyName || !workEmail || !phoneNumber || !primaryInterest || !messageDetails) {
      return NextResponse.json({ error: 'All fields including phone number are required.' }, { status: 400 });
    }

    const phoneRegex = /^\+?[0-9\s\-()]{10,25}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    }
    
    const newSubmission = await addSubmission({
      fullName,
      companyName,
      workEmail,
      phoneNumber,
      primaryInterest,
      messageDetails
    });
    
    return NextResponse.json({ success: true, submission: newSubmission });
  } catch (error) {
    console.error('API Error: Submission failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const submissions = await getSubmissions();
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('API Error: Failed to fetch submissions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const success = await deleteSubmission(id);
    if (!success) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error: Failed to delete submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
