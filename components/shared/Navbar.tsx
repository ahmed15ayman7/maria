"use client";
import React, { useState, Suspense } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Rakkas } from "next/font/google";
import { useDebouncedCallback } from "use-debounce";
import Loader from "./Loader";
const rakkas = Rakkas({
  weight: "400",
  subsets: ["latin"],
});

export const FloatingNav = ({
  navItems,
  className,
  isAdmin
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  isAdmin?:boolean;
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previousValue = scrollYProgress.getPrevious();
      let direction = previousValue !== undefined ? current - previousValue : 0;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  // Handle search input change
  const handleSearch = useDebouncedCallback((e: any) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      e.target.value.length > 2 && params.set("s", e.target.value);
    } else {
      params.delete("s");
    }
    replace(`${pathname}?${params}`);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearch(e);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`${isAdmin?"/dashboard":""}/news?s=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="">
<div className={`${rakkas.className} w-full items-center  flex justify-between max-lg:pt-16`}>
        <Link
          href="/"
          className="font-rakkas font-bold p-6 max-lg:px-1 text-[50px] text-gold-500"
        >
          مريه
        </Link>
        <div className="bg-gold-500 p-1 rounded-full max-lg:flex  hidden  z-50  items-center">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="ابحث..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-transparent border-none placeholder-white text-white focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#292829] h-7 flex justify-center items-center rounded-full w-7"
              >
                <SearchOutlined />
              </button>
            </form>
          </div>
        <Link href="/" className=" z-50 max-lg:block hidden ">
            <Image
              src="/images/دائري مع مريه.png"
              alt="logo"
              width={40}
              height={40}
              className="ml-5 rounded-full bg-gold-500 shadow-xl scale-110"
              />
          </Link>

      </div>
      <div className="relative ">
    <AnimatePresence mode="wait" >
        <motion.div
          initial={{ opacity: 1, y: 10 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex max-w-fit max-lg:max-w-full  md:min-w-[70vw] navGold max-lg:before:hidden max-lg:after:hidden bg-gold-500 max-lg:w-full  lg:min-w-fit fixed z-[5000] top-10 max-lg:top-3 inset-x-0 mx-auto max-lg:mx-0 px-10 max-lg:px-3 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4 max-lg:space-x-1",
            className
          )}
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.125)",
          }}
          >
          <Link href="/" className="absolute left-0 z-50 max-lg:hidden -translate-x-[150%]">
            <Image
              src="/images/دائري مع مريه.png"
              alt="logo"
              width={70}
              height={70}
              className="ml-5 rounded-full bg-gold-500 shadow-xl scale-110"
              />
          </Link>
          {navItems.map((navItem, idx) => (
            <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 font-bold items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
            >
              <span className="block md:hidden">{navItem.icon}</span>
              <span className="text-sm !cursor-pointer">{navItem.name}</span>
            </Link>
          ))}
          <div className="bg-gold-500 p-2 rounded-full  max-lg:hidden flex absolute right-0 z-50 translate-x-[120%] items-center">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="ابحث..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-transparent border-none placeholder-white text-white focus:outline-none"
                />
              <button
                type="submit"
                className="bg-[#292829] h-7 flex justify-center items-center rounded-full w-7"
                >
                <SearchOutlined />
              </button>
            </form>
          </div>
        </motion.div>
    </AnimatePresence>
      </div>
                </div>
  );
};

export default function Navbar({ isAdmin }: { isAdmin?: boolean }) {
  const navItems = [
    { name: "الرئيسية", link: "/" },
    { name: "جميع الاخبار", link: "/news" },
    { name: "حجز اعلان", link: "/feedbacks" },
    { name: "تواصل معنا", link: "/contact" },
    { name: "من نحن", link: "/about" },
  ];
  const navItems2 = [
    { name: "التحكم", link: "/dashboard" },
    { name: "الاخبار", link: "/dashboard/news" },
    { name: "الاعلانات ", link: "/dashboard/feedbacks" },
    { name: " اضافة اعلان", link: "/dashboard/ad" },
    { name: "المتواصلين", link: "/dashboard/contact" },
    { name: "من نحن", link: "/dashboard/about" },
  ];

  return (

    
      <Suspense fallback={<Loader/>}>
        <FloatingNav navItems={isAdmin ? navItems2 : navItems} isAdmin={isAdmin} />
      </Suspense>
  );
}
