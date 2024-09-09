import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import InfintyProvider from "../components/providers/InfintyProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: " مريه - أخبار وآراء",
  description: "موقع مريه هو موقع إخباري يقدم آخر الأخبار والتحليلات في مختلف المجالات. تابعونا للحصول على تحديثات يومية.",
  keywords: "أخبار, مريه, أخبار اليوم, أخبار محلية, أخبار دولية, تحليلات, مقالات",
  themeColor: "#ffffff", // اللون الذي تفضله
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: " مريه - أخبار وآراء",
    description: "موقع مريه هو موقع إخباري يقدم آخر الأخبار والتحليلات في مختلف المجالات. تابعونا للحصول على تحديثات يومية.",
    url: "https://maria.com", // رابط الموقع
    siteName: "مريه",
    images: [
      {
        url: "/public/images/دائري مع مريه.png", // صورة للمشاركة
        width: 1200,
        height: 630,
        alt: "شعار موقع مريه",
      },
    ],
    locale: "ar_AR", // اللغة العربية
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "موقع مريه - أخبار وآراء",
    description: "موقع مريه هو موقع إخباري يقدم آخر الأخبار والتحليلات في مختلف المجالات. تابعونا للحصول على تحديثات يومية.",
 // صورة لمشاركة تويتر
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InfintyProvider>
      <html lang="en">
        <head>
        </head>
        <body
        dir={"rtl"}
          className={`${geistSans.variable}  ${geistMono.variable} min-h-screen antialiased bg-[#292829]`} style={{backgroundImage:"linear-gradient(45deg,#252425,#312F31,#292829,#292829,#393639,#292829,#292829,#393639,#292828)"}}>
          {children}
          <ToastContainer />
        </body>
      </html>
    </InfintyProvider>
  );
}
