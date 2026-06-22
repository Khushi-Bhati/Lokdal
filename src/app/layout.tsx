import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DataProvider } from "@/lib/dataStore";
import { LanguageProvider } from "@/components/LanguageProvider";
import Preloader from "@/components/Preloader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lok Dal  | Official Website",
  description: "Official website of Lok Dal, a political party dedicated to nurturing farmers, empowering youth, and building a self-reliant and progressive India.",
  keywords: "Lok Dal, Farmers of India, Chaudhary Charan Singh, Jayant Chaudhary, Political Party India, Uttar Pradesh, Rural Development, Agriculture Reform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#fbfdfb] text-zinc-900">
        <Preloader />
        <DataProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </DataProvider>
      </body>
    </html>
  );
}
