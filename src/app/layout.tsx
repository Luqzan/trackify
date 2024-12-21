import type { Metadata } from "next";
import "./globals.css";
import TopBar from "./ui/TopBar";

export const metadata: Metadata = {
  title: {
    template: "%s | Trackify",
    default: "Trackify",
  },
  description: "Sales management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TopBar />
        <main className="bg-background">{children}</main>
      </body>
    </html>
  );
}
