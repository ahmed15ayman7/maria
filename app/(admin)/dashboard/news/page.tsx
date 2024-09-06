'use client';
import NewsCard from '@/components/cards/NewsCard';
import AddNewsForm from '@/components/forms/AddNews';
import Loader from '@/components/shared/Loader';
import ReloadButton from '@/components/shared/reload';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
    params: { search: searchTerm }, // Sending search term as a parameter in the request
  });
  return response.data;
}

export default function News() {
  const [searchTerm, setSearchTerm] = useState('');
  const isAdmin = true; // Determine if the user is an admin

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
      <NewsItems searchTerm={searchTerm} isAdmin={isAdmin} />
    </motion.div>
  );
}

function NewsItems({ searchTerm, isAdmin }: { searchTerm: string; isAdmin: boolean }) {
  const { data: newsItems, error, isLoading, refetch } = useQuery({
    queryKey: ['news', searchTerm], // Adding searchTerm as part of the query key
    queryFn: () => fetchNews(searchTerm),
  });

  const handleDelete = async (id: string) => {
    // You can add your delete logic here, if needed
    console.log(`Deleting news item with ID: ${id}`);
    // Optionally, you can refetch the news after deletion
    refetch();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ReloadButton />;
  }

  return (
    <div className="w-full max-w-4xl space-y-4">
      {searchTerm === "" && <AddNewsForm refetch={refetch} />}
      {newsItems?.map((item) => (
        <NewsCard
          key={item._id}
          title={item.title}
          content={item.content}
          author={item.author}
          publishedAt={item.publishedAt}
          imageUrl={item.imageUrl}
          isAdmin={isAdmin} // Pass isAdmin prop
          newsId={item?._id} 
          onDelete={handleDelete} // Pass the onDelete callback
        />
      ))}
    </div>
  );
}
