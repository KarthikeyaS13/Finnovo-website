import { NextResponse } from 'next/server';
import { addSubmission, getSubmissions, deleteSubmission } from '@/lib/db';
import { sendNewConsultationNotification, sendMeetingInvitationToUser } from '@/services/mailService';
import { createZohoMeeting } from '@/services/zohoService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      companyName,
      workEmail,
      phoneNumber,
      primaryInterest,
      messageDetails,
      scheduledDate,
      scheduledTime,
      duration,
      meetingMode
    } = body;
    
    if (!fullName || !companyName || !workEmail || !phoneNumber || !primaryInterest || !messageDetails) {
      return NextResponse.json({ error: 'All contact details including phone number are required.' }, { status: 400 });
    }

    if (!scheduledDate || !scheduledTime || !duration || !meetingMode) {
      return NextResponse.json({ error: 'Consultation scheduling details (date, time, duration, mode) are required.' }, { status: 400 });
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
      messageDetails,
      scheduledDate,
      scheduledTime,
      duration,
      meetingMode
    });
    
    try {
      const createdAt = newSubmission && 'createdAt' in newSubmission
        ? new Date((newSubmission as any).createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
        : new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

      let dynamicMeeting = null;
      try {
        // Attempt to create a dynamic meeting if credentials exist
        dynamicMeeting = await createZohoMeeting({
          topic: primaryInterest,
          scheduledDate,
          scheduledTime,
          participantEmail: workEmail
        });
      } catch (zohoError) {
        console.warn('API Warning: Dynamic Zoho Meeting creation failed or not configured. Falling back to static link.', zohoError);
      }

      await sendNewConsultationNotification({
        fullName,
        companyName,
        workEmail,
        phoneNumber,
        primaryInterest,
        messageDetails,
        createdAt,
        dynamicMeeting
      });
      
      await sendMeetingInvitationToUser({
        fullName,
        workEmail,
        primaryInterest,
        scheduledDate,
        scheduledTime,
        dynamicMeeting
      });
    } catch (emailErr) {
      console.error('API Error: Consultation notification email sending failed:', emailErr);
    }
    
    return NextResponse.json({
      success: true,
      message: "Consultation request submitted successfully."
    });
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
