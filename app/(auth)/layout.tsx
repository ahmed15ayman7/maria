import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className=" min-h-screen flex justify-center items-center">
       <Image src={"/images/مرية خلفية شفافة.png"} alt='logo' width={100} height={100} className='ml-5 rounded-full shadow-xl fixed top-3 left-3 scale-110' />
    {children}
    </div>;
}