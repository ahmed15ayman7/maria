// components/AdSwiper.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


export default function AdSwiper({ads}:{ads:{_id:string,imageUrl:string,redirectUrl:string}[]}) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
    //   navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="w-full"
      style={{
        position: "relative",
        //@ts-ignore
        "--swiper-navigation-position": "absolute",
        //@ts-ignore
        "--swiper-navigation-color": "#ffffff",
        //@ts-ignore
        "--swiper-pagination-color": "#ffffff",
        padding: " 25px 10px ",
      }}
    >
      {ads.map((ad, index) => (
        <SwiperSlide key={index}>
          <a href={ad.redirectUrl} className='px-20' target="_blank" rel="noopener noreferrer">
            <img
              src={ad.imageUrl}
              alt={`Ad ${index + 1}`}
              className="w-full object-fit rounded-xl h-[50vh] max-sm:h-[20vh]"
            />
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
