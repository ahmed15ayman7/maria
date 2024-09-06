'use client';
import NewsCard from '@/components/cards/NewsCard';
import Loader from '@/components/shared/Loader';
import ReloadButton from '@/components/shared/reload';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface NewsItem {
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
}

async function fetchNews(searchTerm: string): Promise<NewsItem[]> {
  const response = await axios.get('/api/news', {
    params: { search: searchTerm }, // إرسال نص البحث كمعامل في الطلب
  });
  return response.data.news;
}
export default function News() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#01031c]/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-5xl font-bold mb-8 text-gold-500">Latest News</h2>
      <input
        type="text"
        placeholder="Search news..."
        className="mb-4 p-3 w-full max-w-md bg-transparent rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
 <NewsItems searchTerm={searchTerm}/>
    </motion.div>
  );
}
function NewsItems({searchTerm}:{searchTerm:string}) {
  const { data: newsItems, error, isLoading } = useQuery({
    queryKey: ['news', searchTerm], // إضافة searchTerm كجزء من مفتاح الاستعلام
    queryFn: () => fetchNews(searchTerm), // تمرير searchTerm إلى دالة fetchNews
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ReloadButton />;
  }

  return (

      <div className="w-full max-w-4xl space-y-4">
        {newsItems?.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            content={item.content}
            author={item.author}
            publishedAt={item.publishedAt}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
  );
}
