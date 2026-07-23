import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "./site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pamtech Group",
    template: "%s",
  },
  description:
    "Pamtech Group is a Nigerian multi-sector company committed to service, innovation, and operational excellence.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
