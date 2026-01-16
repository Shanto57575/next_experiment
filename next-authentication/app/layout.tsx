import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "sonner";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Next Auth App",
  description: "A Next Auth app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased max-w-5xl mx-auto`}>
        <Navbar />
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
