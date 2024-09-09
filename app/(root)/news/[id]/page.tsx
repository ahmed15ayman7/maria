"use client";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '@/components/shared/Loader';
import ReloadButton from '@/components/shared/reload';

interface NewsItem {
    _id: string;
    title: string;
    content: string;
    author: string;
    publishedAt: string;
    imageUrl?: string;
  }
  


const fetchNewsItem = async (id: string) => {
    try{

        const response = await axios.get(`/api/news/${id}`);
        return response.data;
    }catch(e:any){
        console.error('Error fetching news by id:', e);
    }
};

const NewsDetail = ({ params }:{params:{id:string}}) => {
  const router = useRouter();

  const { data: news, isLoading, isError, refetch } = useQuery({queryKey:['newsItem', params.id], queryFn:() => fetchNewsItem(params.id)});

  if (isLoading) return <Loader />; // Display loader while loading

  if (isError) return <ReloadButton  />; // Display a reload button if there's an error

  if (!news) {
    return <div>News not found!</div>;
  }

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-[#292829]/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-[99vw] max-sm:flex-col-reverse w-full flex gap-10  bg-white/10 rounded-lg p-8 shadow-lg">
        
         <div className="flex w-1/2 max-sm:w-full flex-col justify-between"> 
         <div> 
        <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
        <p className="text-gray-300 text-sm mb-4">By {news.author} | {new Date(news.publishedAt).toLocaleDateString()}</p>
        <p className="text-lg text-gray-200">{news.content}</p>
         </div>
         <div> 
        <button className="mt-8 bg-gold-500 text-white p-3 rounded-lg" onClick={() => router.back()}>
          الرجوع اللي اخر الاخبار
        </button>
         </div>
         </div>
         {news.imageUrl && (
          <img src={news.imageUrl} alt={news.title} className="w-1/2 max-sm:w-full h-auto rounded-md mb-6" />
        )}
      </div>
    </motion.div>
  );
};

export default NewsDetail;
