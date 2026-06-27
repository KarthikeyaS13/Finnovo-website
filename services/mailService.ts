import nodemailer from 'nodemailer';

// Create SMTP Transporter using environment variables
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_PORT === '465', // true for port 465 (SSL), false for 587 (TLS/starttls)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  icalEvent?: {
    filename: string;
    method: string;
    content: string;
  };
}

/**
 * Reusable core email sender function.
 * Accessible throughout the project for any future email requirements.
 */
export async function sendEmail(options: MailOptions): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"FINNOVO" <no-reply@finnovo.io>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || '',
      ...(options.icalEvent && { icalEvent: options.icalEvent }),
    });
    console.log('[MailService] Email sent successfully. MessageId:', info.messageId);
    return true;
  } catch (error) {
    console.error('[MailService] Error sending email:', error);
    return false;
  }
}

/**
 * Specifically sends a new consultation request notification to info@finnovo.io.
 * Employs a premium FINNOVO HTML template (Dark Blue Header & Gold Accent #E9B615).
 */
export async function sendNewConsultationNotification(data: {
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber: string;
  primaryInterest: string;
  messageDetails: string;
  createdAt: string;
  dynamicMeeting?: {
    joinLink: string;
    meetingId: string;
    password?: string;
  } | null;
}): Promise<boolean> {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Consultation Request</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #F8FAFC;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      background-color: #F8FAFC;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #FFFFFF;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
      border: 1px solid #E2E8F0;
    }
    .header {
      background-color: #08142D;
      padding: 32px 24px;
      text-align: center;
      border-bottom: 4px solid #E9B615;
    }
    .header h1 {
      color: #FFFFFF;
      margin: 0;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 32px 24px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #08142D;
      margin-top: 0;
      margin-bottom: 24px;
      border-left: 3px solid #E9B615;
      padding-left: 10px;
    }
    .field-row {
      margin-bottom: 18px;
      border-bottom: 1px solid #F1F5F9;
      padding-bottom: 14px;
    }
    .field-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }
    .label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748B;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .value {
      font-size: 14px;
      color: #0F172A;
      font-weight: 500;
      line-height: 1.5;
    }
    .message-box {
      background-color: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 16px;
      margin-top: 8px;
      white-space: pre-wrap;
      font-size: 14px;
      color: #334155;
      line-height: 1.6;
    }
    .footer {
      background-color: #F8FAFC;
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #64748B;
      border-top: 1px solid #E2E8F0;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>FINNOVO</h1>
      </div>
      <div class="content">
        <div class="section-title">New Consultation Request Received</div>
        
        <div class="field-row">
          <div class="label">Full Name</div>
          <div class="value">${data.fullName}</div>
        </div>
        
        <div class="field-row">
          <div class="label">Company</div>
          <div class="value">${data.companyName}</div>
        </div>
        
        <div class="field-row">
          <div class="label">Work Email</div>
          <div class="value"><a href="mailto:${data.workEmail}" style="color: #08142D; text-decoration: none; font-weight: 600;">${data.workEmail}</a></div>
        </div>
        
        <div class="field-row">
          <div class="label">Phone Number</div>
          <div class="value">${data.phoneNumber}</div>
        </div>
        
        <div class="field-row">
          <div class="label">Primary Interest</div>
          <div class="value">${data.primaryInterest}</div>
        </div>
        
        <div class="field-row">
          <div class="label">Message</div>
          <div class="value message-box">${data.messageDetails}</div>
        </div>
        
        ${data.dynamicMeeting ? `
        <div class="field-row">
          <div class="label">Zoho Meeting (Dynamic)</div>
          <div class="value">
            <a href="${data.dynamicMeeting.joinLink}" style="color: #08142D; text-decoration: none; font-weight: 600;">Join Link</a><br />
            ID: ${data.dynamicMeeting.meetingId}<br />
            Password: ${data.dynamicMeeting.password || 'N/A'}
          </div>
        </div>
        ` : ''}
        <div class="field-row">
          <div class="label">Submitted At</div>
          <div class="value">${data.createdAt}</div>
        </div>
      </div>
      <div class="footer">
        This enquiry was automatically generated from the FINNOVO website.
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
New Consultation Request Received

Full Name: ${data.fullName}
Company: ${data.companyName}
Work Email: ${data.workEmail}
Phone Number: ${data.phoneNumber}
Primary Interest: ${data.primaryInterest}
Message: ${data.messageDetails}
Submitted At: ${data.createdAt}

This enquiry was automatically generated from the FINNOVO website.
  `.trim();

  return sendEmail({
    to: 'info@finnovo.io',
    subject: '🔔 New Consultation Request - FINNOVO Website',
    html,
    text,
  });
}

/**
 * Sends a calendar invite to the user after they schedule a consultation.
 */
export async function sendMeetingInvitationToUser(data: {
  fullName: string;
  workEmail: string;
  primaryInterest: string;
  scheduledDate: string;
  scheduledTime: string;
  dynamicMeeting?: {
    joinLink: string;
    meetingId: string;
    password?: string;
  } | null;
}): Promise<boolean> {
  const [year, month, day] = data.scheduledDate.split('-');
  const [time, modifier] = data.scheduledTime.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = modifier === 'AM' ? '00' : '12';
  } else if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  const startDateIstStr = `${year}-${month}-${day}T${hours.padStart(2, '0')}:${minutes}:00+05:30`;
  const startDate = new Date(startDateIstStr);
  const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 mins
  
  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  const dtStart = formatICSDate(startDate);
  const dtEnd = formatICSDate(endDate);
  const now = formatICSDate(new Date());
  const fromEmail = process.env.EMAIL_FROM || 'no-reply@finnovo.io';
  const organizerEmail = fromEmail.replace(/.*<([^>]+)>.*/, '$1');
  const zohoMeetLink = data.dynamicMeeting?.joinLink || process.env.ZOHO_MEET_LINK || 'https://meet.zoho.in/your-meeting-link';
  const zohoMeetingId = data.dynamicMeeting?.meetingId || process.env.ZOHO_MEETING_ID || '';
  const zohoMeetingPassword = data.dynamicMeeting?.password || process.env.ZOHO_MEETING_PASSWORD || '';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FINNOVO//Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@finnovo.io`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${data.primaryInterest} - FINNOVO`,
    `DESCRIPTION:Consultation regarding ${data.primaryInterest}\\n\\nJoin Zoho Meeting: ${zohoMeetLink}`,
    `LOCATION:${zohoMeetLink}`,
    `ORGANIZER;CN=FINNOVO:mailto:${organizerEmail}`,
    `ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=${data.fullName}:mailto:${data.workEmail}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const weekday = startDate.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Kolkata' });
  const monthDay = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' });
  const yearStr = startDate.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'Asia/Kolkata' });
  const dateStr = `${weekday}, ${monthDay} ${yearStr}`;
  const startTimeStr = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
  const endTimeStr = endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <div style="margin-bottom: 20px;">
        <h2 style="color: #0072c6; margin: 0; font-size: 20px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 24px;">✿</span> Meeting
        </h2>
      </div>
      
      <p style="color: #555; font-size: 14px; margin-bottom: 20px;">FINNOVO has invited you to participate in a meeting</p>
      
      <h1 style="color: #111; font-size: 24px; margin-top: 10px; margin-bottom: 20px;">${data.primaryInterest}</h1>
      
      <div style="border-bottom: 1px dashed #ccc; padding-bottom: 15px; margin-bottom: 25px;">
        <p style="color: #333; font-size: 15px; margin: 0;">${dateStr}, ${startTimeStr} - ${endTimeStr} IST</p>
      </div>
      
      <a href="${zohoMeetLink}" style="display: inline-block; background-color: #0072c6; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 24px; font-weight: bold; font-size: 14px; margin-bottom: 25px;">Join meeting</a>
      
      ${zohoMeetingId ? `
      <div style="margin-bottom: 25px;">
        <p style="color: #333; font-size: 14px; margin: 0 0 8px 0;">Meeting ID : ${zohoMeetingId}</p>
        ${zohoMeetingPassword ? `<p style="color: #333; font-size: 14px; margin: 0;">Password : ${zohoMeetingPassword}</p>` : ''}
      </div>
      ` : ''}

      <p style="color: #666; font-size: 13px; margin-bottom: 40px;">You can also join the meeting using our <a href="#" style="color: #0072c6; text-decoration: none;">iOS</a> and <a href="#" style="color: #0072c6; text-decoration: none;">Android</a> apps for mobile.</p>
      
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="height: 3px; margin-bottom: 20px;">
        <tr>
          <td width="25%" style="background-color: #ea4335;"></td>
          <td width="25%" style="background-color: #fbbc05;"></td>
          <td width="25%" style="background-color: #34a853;"></td>
          <td width="25%" style="background-color: #4285f4;"></td>
        </tr>
      </table>
      
      <p style="color: #999; font-size: 11px; line-height: 1.5; margin: 0;">
        This email has been sent to <a href="mailto:${data.workEmail}" style="color: #0072c6; text-decoration: none;">${data.workEmail}</a> by <a href="mailto:${organizerEmail}" style="color: #0072c6; text-decoration: none;">${organizerEmail}</a> from FINNOVO via Zoho meeting. For any clarifications, please contact <a href="mailto:${organizerEmail}" style="color: #0072c6; text-decoration: none;">${organizerEmail}</a>. If you think this is SPAM, please report the issue or email abuse@zohocorp.com. To stop receiving emails from this organization, Unsubscribe.
      </p>
    </div>
  `;

  return sendEmail({
    to: data.workEmail,
    subject: `Invitation: ${data.primaryInterest} with FINNOVO`,
    html,
    icalEvent: {
      filename: 'invite.ics',
      method: 'request',
      content: icsContent
    }
  });
}

/**
 * Future-ready template stub: Customer Auto-reply email.
 */
export async function sendAutoReplyToCustomer(to: string, fullName: string): Promise<boolean> {
  const html = `
    <h2>Hi ${fullName},</h2>
    <p>Thank you for reaching out to FINNOVO. We have received your consultation request and our team will get back to you shortly.</p>
  `;
  return sendEmail({
    to,
    subject: 'Thank you for your interest in FINNOVO',
    html,
  });
}

/**
 * Future-ready template stub: Meeting invitations.
 */
export async function sendMeetingInvitation(to: string, meetingDetails: string): Promise<boolean> {
  const html = `
    <h2>Your Meeting Invitation</h2>
    <p>${meetingDetails}</p>
  `;
  return sendEmail({
    to,
    subject: 'FINNOVO - Scheduled Meeting Invitation',
    html,
  });
}

/**
 * Future-ready template stub: OTP validation email.
 */
export async function sendOtpEmail(to: string, otpCode: string): Promise<boolean> {
  const html = `
    <h2>Security Verification Code</h2>
    <p>Your one-time password (OTP) is: <strong>${otpCode}</strong></p>
  `;
  return sendEmail({
    to,
    subject: 'FINNOVO - Verification OTP',
    html,
  });
}
