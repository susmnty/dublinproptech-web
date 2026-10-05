   import { redirect } from "next/navigation";

   // Old page from the previous site: send visitors to the blinds site and tell Google not to list it
   export const metadata = { robots: { index: false, follow: false } };

   export default function OldBlindsPage() {
     redirect("https://luxblinds.ie/");
   }