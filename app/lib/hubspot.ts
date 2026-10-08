// Sends website form enquiries straight to HubSpot from the browser.
// (The old /api/contact route can't run on Hostinger because the site is a static export.)
// Portal ID and form ID are public values (they're visible in HubSpot's own embed code), so it's safe to keep them here.

const HUBSPOT_PORTAL_ID = "246058565";
const HUBSPOT_FORM_GUID = "c67e7aaf-8cee-4fb2-a2d2-90621b8d12c9";

export type Enquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
};

// HubSpot's tracking cookie links the enquiry to the visitor's site activity (optional)
function getHubspotCookie(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? match[1] : undefined;
}

export async function submitEnquiry(data: Enquiry): Promise<boolean> {
  const hutk = getHubspotCookie();
  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            { name: "firstname", value: data.firstName },
            { name: "lastname", value: data.lastName },
            { name: "email", value: data.email },
            { name: "phone", value: data.phone || "" },
            { name: "message", value: data.message },
          ],
          context: {
            ...(hutk ? { hutk } : {}),
            pageUri: typeof window !== "undefined" ? window.location.href : "https://dublinproptech.com/",
            pageName: typeof document !== "undefined" ? document.title : "Dublin PropTech",
          },
        }),
      }
    );
    return res.ok;
  } catch (error) {
    console.error("HubSpot submission error:", error);
    return false;
  }
}
