import type { Metadata } from "next";

import "./globals.css";
import { Urbanist } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { ReduxProvider } from "@/redux/provider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
