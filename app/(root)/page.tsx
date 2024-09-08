"use client";
import NewsCard from "@/components/cards/NewsCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "@/components/shared/Loader";
import ReloadButton from "@/components/shared/reload";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide
import "swiper/css"; // Swiper styles
import "swiper/css/navigation"; // For navigation arrows
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Swiper modules
import About from "./about/page";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const fetchNews = async () => {
  const { data } = await axios.get("/api/news");
  return data;
};

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const newsItems = data || [];
  const newsItemsWithImages = newsItems.filter((e: any) => e.imageUrl);
  const newsItemsWithoutImages = newsItems.filter((e: any) => !e.imageUrl);

  if (isLoading) return <Loader />;
  if (isError) return <ReloadButton />;

  return (
    <div className="min-h-screen pt-10 flex flex-col gap-20 items-center justify-center relative">
      <div className="max-w-[100vw] flex flex-col w-full items-center justify-center relative">
        {/* Swiper for news items with images */}
        {newsItemsWithImages.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            style={{
              position: "relative",
              //@ts-ignore
              "--swiper-navigation-position": "absolute",
              //@ts-ignore
              "--swiper-navigation-color": "#ffffff",
              //@ts-ignore
              "--swiper-pagination-color": "#ffffff",
              padding: " 25px 20px ",
            }}
      
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="w-full"
          >
            {newsItemsWithImages.map((news: any, index: number) => (
              <SwiperSlide key={index}>
                <NewsCard
                  title={news.title}
                  content={news.content}
                  author={news.author}
                  publishedAt={news.publishedAt}
                  imageUrl={news.imageUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* <div className="flex flex-col max-w-[100vw] w-full items-center justify-center relative">

        {newsItemsWithoutImages.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={newsItemsWithoutImages.length == 1?1:2}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            className="w-full"
          >
            {newsItemsWithoutImages.map((news: any, index: number) => (
              <SwiperSlide key={index}>
                <NewsCard
                  title={news.title}
                  content={news.content}
                  author={news.author}
                  publishedAt={news.publishedAt}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div> */}
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
