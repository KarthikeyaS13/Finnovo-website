import axios from 'axios';

// Required environment variables:
// ZOHO_CLIENT_ID
// ZOHO_CLIENT_SECRET
// ZOHO_REFRESH_TOKEN
// ZOHO_ZSOID (Your user/organization ID in Zoho Meeting)
// ZOHO_DOMAIN (e.g. "zoho.in" or "zoho.com")

const ZOHO_DOMAIN = process.env.ZOHO_DOMAIN || 'zoho.in';

export interface ZohoMeetingDetails {
  topic: string;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // hh:mm AM/PM
  participantEmail: string;
}

export interface ZohoMeetingResult {
  joinLink: string;
  meetingId: string;
  password?: string;
}

/**
 * Exchanges the refresh token for a short-lived access token.
 */
async function getAccessToken(): Promise<string> {
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Zoho API credentials are not fully configured in environment variables.");
  }

  const tokenUrl = `https://accounts.${ZOHO_DOMAIN}/oauth/v2/token`;
  
  const params = new URLSearchParams();
  params.append('refresh_token', refreshToken);
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('grant_type', 'refresh_token');

  try {
    const response = await axios.post(tokenUrl, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data.error) {
      throw new Error(`Zoho Token Error: ${response.data.error}`);
    }

    return response.data.access_token;
  } catch (error: any) {
    console.error("Error fetching Zoho access token:", error?.response?.data || error.message);
    throw new Error("Failed to authenticate with Zoho");
  }
}

/**
 * Creates a meeting via the Zoho Meeting API.
 */
export async function createZohoMeeting(details: ZohoMeetingDetails): Promise<ZohoMeetingResult> {
  try {
    const accessToken = await getAccessToken();
    const zsoid = process.env.ZOHO_ZSOID;

    if (!zsoid) {
      throw new Error("ZOHO_ZSOID is not configured in environment variables.");
    }

    const meetingApiUrl = `https://meeting.${ZOHO_DOMAIN}/api/v2/${zsoid}/sessions.json`;

    // Format start time to MM/dd/yyyy hh:mm a
    const [year, month, day] = details.scheduledDate.split('-');
    const formattedStartTime = `${month}/${day}/${year} ${details.scheduledTime}`;

    const payload = {
      session: {
        topic: `${details.topic} - FINNOVO`,
        agenda: `Consultation regarding ${details.topic}`,
        startTime: formattedStartTime,
        timezone: "Asia/Calcutta",
        duration: 30, // Default duration
        participants: [
          {
            email: details.participantEmail
          }
        ]
      }
    };

    const response = await axios.post(meetingApiUrl, payload, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const sessionData = response.data.session;
    
    if (!sessionData || !sessionData.joinLink) {
      throw new Error("Invalid response from Zoho Meeting API");
    }

    return {
      joinLink: sessionData.joinLink,
      meetingId: sessionData.meetingKey || sessionData.meetingId || sessionData.key || "",
      password: sessionData.password || ""
    };
  } catch (error: any) {
    console.error("Error creating Zoho Meeting:", error?.response?.data || error.message);
    // If API is not configured or fails, fallback to static environment variable links if they exist.
    // Or throw error if you prefer strict failure. We will throw an error to trigger static fallback in route.ts
    throw error;
  }
}
