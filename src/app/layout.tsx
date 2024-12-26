import type { Metadata } from "next";
import "./globals.css";
import TopBar from "./ui/TopBar";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Footer from "./ui/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Trackify",
    default: "Trackify",
  },
  description: "Sales management system",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body>
          <div className="min-h-screen bg-background flex flex-col md:h-screen">
            <SignedIn>
              <TopBar />
            </SignedIn>

            <main className="md:flex-1">{children}</main>

            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
