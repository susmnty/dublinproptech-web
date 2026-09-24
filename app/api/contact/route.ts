import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formGuid = process.env.HUBSPOT_FORM_GUID;
    
    const hubspotEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

    const response = await fetch(hubspotEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: [
          { name: 'firstname', value: body.firstName },
          { name: 'lastname', value: body.lastName },
          { name: 'email', value: body.email },
          { name: 'phone', value: body.phone }, // Added phone based on your HubSpot form fields
          { name: 'message', value: body.message }
        ],
        context: {
          pageUri: "https://dublinproptech.com/contact",
          pageName: "Dublin PropTech Contact"
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to submit to HubSpot');
    }

    return NextResponse.json({ success: true, message: "Lead captured!" });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 });
  }
}