'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DeleteOutlined } from '@ant-design/icons';
import { message } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';

// Fetch ads from the API
const fetchAds = async () => {
  const response = await fetch('/api/ads');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Delete ad from the API
export default function AdSwiper({
  ads,
  isAdmin,
  refetch,
}: {
  refetch?: () => void;
  isAdmin?: boolean;
  ads: { _id: string; imageUrl: string; redirectUrl: string }[];
}) {
  const deleteAd = async (id: string) => {
    const loadingToastId = toast.loading('Deleting AD...'); // Show loading toast

    if (!confirm('Are you sure you want to delete this AD article?')) {
      toast.dismiss(loadingToastId); // Dismiss the loading toast if the user cancels
      return;
    }

    try {
      await axios.delete(`/api/ads?id=${id}`);
      toast.update(loadingToastId, {
        render: 'AD deleted successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
      refetch && refetch();
    } catch (error) {
      console.error('Error deleting news:', error);
      toast.update(loadingToastId, {
        render: 'Failed to delete AD article',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="w-full"
      style={{
        position: 'relative',
        //@ts-ignore
        '--swiper-navigation-position': 'absolute',
        //@ts-ignore
        '--swiper-navigation-color': '#ffffff',
        //@ts-ignore
        '--swiper-pagination-color': '#ffffff',
        padding: '25px 10px',
      }}
    >
      {ads.map((ad) => (
        <SwiperSlide key={ad._id} className="relative overflow-hidden">
          <a href={ad.redirectUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={ad.imageUrl}
              alt={`Ad ${ad._id}`}
              className="w-full object-cover rounded-xl h-[50vh] max-sm:h-[20vh]"
            />
          </a>
          {/* Label positioned at the top-left corner */}
          <span
            className="absolute top-9 w-24 h-10 pt-3   text-center -left-8 bg-gray-900 text-white px-2 py-1 text-sm font-bold -rotate-45"
            style={{ transformOrigin: 'left top' }}
          >
            إعلان
          </span>
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the link click
                deleteAd(ad._id);
              }}
              className="absolute top-2 left-10 bg-white rounded-full p-1 hover:bg-gray-200 transition"
              title="Delete Ad"
            >
              <DeleteOutlined className="text-red-500" />
            </button>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
