// src/app/contact/page.tsx
export const revalidate = 60;

import ContactClient from "./contact-client";

export default function ContactPage() {
  return <ContactClient />;
}