import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomerSupportChat from "@/components/CustomerSupportChat";

export const metadata: Metadata = {
  title: "Prayana AI - Modern AI Travel Itinerary Planner",
  description: "Plan Smarter. Journey Better.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-brand-bg text-brand-text min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <CustomerSupportChat />
      </body>
    </html>
  );
}