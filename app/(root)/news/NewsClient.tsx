// app/news/NewsClient.tsx (Client Component)
'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Loader from '@/components/shared/Loader';
import ReloadButton from '@/components/shared/reload';
import NewsCard from '@/components/cards/NewsCard';

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
}

async function fetchNews(searchTerm: string): Promise<NewsItem[]> {
  const response = await axios.get('/api/news', {
    params: { search: searchTerm },
  });
  return response.data;
}

export default function News() {
  const search = useSearchParams();
  const searchTerm1 = search.get('s');
  const [searchTerm, setSearchTerm] = useState(searchTerm1 ? searchTerm1 : "");

  useEffect(() => {
    setSearchTerm(searchTerm1 ? searchTerm1 : "");
  }, [searchTerm1]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#292829]/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-5xl font-bold mb-8 text-gold-500">اخر الاخبار</h2>
      
      <Suspense fallback={<Loader />}>
        <NewsItems searchTerm={searchTerm} />
      </Suspense>
    </motion.div>
  );
}

function NewsItems({ searchTerm }: { searchTerm: string }) {
  const { data: newsItems, error, isLoading } = useQuery({
    queryKey: ['news', searchTerm],
    queryFn: () => fetchNews(searchTerm),
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
          newsId={item._id}
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
