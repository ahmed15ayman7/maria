import type { Metadata } from "next";
import "./globals.css";

import InfintyProvider from "../components/providers/InfintyProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://maria.com"),
  title: " مريه - أخبار وآراء",
  description:
    "موقع مريه هو موقع إخباري يقدم آخر الأخبار والتحليلات في مختلف المجالات. تابعونا للحصول على تحديثات يومية.",
  keywords:
    "أخبار, مريه, أخبار اليوم, أخبار محلية, أخبار دولية, تحليلات, مقالات",
  // themeColor: "#ffffff", // اللون الذي تفضله
  // viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: " مريه - أخبار وآراء",
    description:
      "موقع مريه هو موقع إخباري يقدم آخر الأخبار والتحليلات في مختلف المجالات. تابعونا للحصول على تحديثات يومية.",
    url: "https://maria.com", // رابط الموقع
    siteName: "مريه",
    images: [
      {
        url: "/images/دائري مع مريه.png", // صورة للمشاركة
        width: 1200,
        height: 630,
        alt: "شعار موقع مريه",
      },
    ],
    locale: "ar_AR", // اللغة العربية
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "موقع مريه - أخبار وآراء",
  //   description: "موقع مريه هو موقع إخباري يقدم آخر الأخبار والتحليلات في مختلف المجالات. تابعونا للحصول على تحديثات يومية.",
  //   images:["/images/دائري مع مريه.png"]
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InfintyProvider>{children}</InfintyProvider>;
}
