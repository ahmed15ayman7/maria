"use client";
import NewsCard from "@/components/cards/NewsCard"; // Importing NewsCard
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "@/components/shared/Loader";
import ReloadButton from "@/components/shared/reload";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Importing motion and AnimatePresence
import About from "./about/page";

const fetchNews = async () => {
  const { data } = await axios.get("/api/news");
  return data;
};

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const [currentIndexWithImages, setCurrentIndexWithImages] =
    useState<number>(0);
  const [currentIndexWithoutImages, setCurrentIndexWithoutImages] =
    useState<number>(0);

  const newsItems = data || [];
  const newsItemsWithImages = newsItems.filter((e: any) => e.imageUrl);
  const newsItemsWithoutImages = newsItems.filter((e: any) => !e.imageUrl);

  const nextWithImages = () => {
    setCurrentIndexWithImages(
      (prevIndex) => (prevIndex + 1) % newsItemsWithImages.length
    );
  };

  const prevWithImages = () => {
    setCurrentIndexWithImages(
      (prevIndex) =>
        (prevIndex - 1 + newsItemsWithImages.length) %
        newsItemsWithImages.length
    );
  };

  const nextWithoutImages = () => {
    setCurrentIndexWithoutImages(
      (prevIndex) => (prevIndex + 1) % newsItemsWithoutImages.length
    );
  };

  const prevWithoutImages = () => {
    setCurrentIndexWithoutImages(
      (prevIndex) =>
        (prevIndex - 1 + newsItemsWithoutImages.length) %
        newsItemsWithoutImages.length
    );
  };

  if (isLoading) return <Loader />;
  if (isError) return <ReloadButton />;

  const hasImages =
    newsItemsWithImages.length > 0 &&
    newsItemsWithImages[currentIndexWithImages];
  const hasNoImages =
    newsItemsWithoutImages.length > 0 &&
    newsItemsWithoutImages[currentIndexWithoutImages];

  return (
    <div className="min-h-screen pt-10 flex flex-col gap-20 items-center justify-center relative">
      <div className="max-w-[100vw] flex flex-col w-full items-center justify-center relative">
        {/* Carousel for news items with images */}
        <div className="flex justify-center w-full">
          {hasImages && (
            <AnimatePresence key={currentIndexWithImages}>
              <motion.div
                key={currentIndexWithImages}
                className="px-20 w-full"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }} // Set the duration of the transition
              >
                <NewsCard
                  title={newsItemsWithImages[currentIndexWithImages].title}
                  content={newsItemsWithImages[currentIndexWithImages].content}
                  author={newsItemsWithImages[currentIndexWithImages].author}
                  publishedAt={
                    newsItemsWithImages[currentIndexWithImages].publishedAt
                  }
                  imageUrl={
                    newsItemsWithImages[currentIndexWithImages].imageUrl
                  }
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Custom Navigation for News with Images */}
        <CustomLeftArrow onClick={prevWithImages} disabled={!hasImages} />
        <CustomRightArrow onClick={nextWithImages} disabled={!hasImages} />
      </div>

      <div className="flex flex-col max-w-[100vw] w-full items-center justify-center relative">
        {/* Carousel for news items without images */}
        <div className="flex flex-wrap justify-center w-full">
          {hasNoImages && (
            <AnimatePresence key={currentIndexWithoutImages}>
              <motion.div
                key={currentIndexWithoutImages}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }} // Set the duration of the transition
              >
                <NewsCard
                  title={
                    newsItemsWithoutImages[currentIndexWithoutImages].title
                  }
                  content={
                    newsItemsWithoutImages[currentIndexWithoutImages].content
                  }
                  author={
                    newsItemsWithoutImages[currentIndexWithoutImages].author
                  }
                  publishedAt={
                    newsItemsWithoutImages[currentIndexWithoutImages]
                      .publishedAt
                  }
                  imageUrl={
                    newsItemsWithoutImages[currentIndexWithoutImages].imageUrl
                  }
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Custom Navigation for News without Images */}
        <CustomLeftArrow onClick={prevWithoutImages} disabled={!hasNoImages} />
        <CustomRightArrow onClick={nextWithoutImages} disabled={!hasNoImages} />
      </div>
      <About />
    </div>
  );
}

const CustomLeftArrow = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      className={`custom-left bg-gold-500 rounded-full absolute left-0 z-10 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}>
      <ChevronLeft color="#ffffff" />
    </button>
  );
};

const CustomRightArrow = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      className={`custom-right bg-gold-500 rounded-full absolute right-0 z-10 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}>
      <ChevronRight color="#ffffff" />
    </button>
  );
};
