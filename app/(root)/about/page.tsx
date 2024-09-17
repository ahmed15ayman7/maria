'use client';

import { motion } from 'framer-motion';
import SwiperAbout from '@/components/shared/SwiperAbout';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import ReloadButton from '@/components/shared/reload';

const fetchAds = async () => {
  const response = await axios.get("/api/about");
  return response.data.abouts;
};
export default function About() {
    const {
      data: about,
      error,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["about"],
      queryFn: () => fetchAds(),
    });
  
    if (isLoading) return <Loader/>;
    if (error) return <ReloadButton/>;
  return (
    <motion.div
    className="min-h-screen max-w-[100vw] flex w-full flex-col md:flex-row gap-10 items-center justify-center max-sm:p-0 p-8 bg-[#292829]/30"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <div className="flex-1 text-center md:text-right mb-8 md:mb-0 md:mr-8">
      <h2 className="text-5xl font-bold mb-4 text-gold-500">من نحن</h2>
      <p className="text-xl text-gray-100 max-w-2xl max-sm:max-w-[300px]">
      {about.title?about.title: `نحن نعمل بشكل تعاوني مع عملائنا لاكتشاف الطريقة الأكثر فعالية وكفاءة لتحقيق احتياجاتهم.`}
      </p>
      <p className="text-lg text-gray-200 max-w-2xl max-sm:max-w-[300px] mt-4">{about.details?about.details:`
      في مجلة مريه، نؤمن بوجود طريقة أفضل لتلبية احتياجات عملائنا. نحن شركة موجودة لمساعدتك على تحقيق أكثر مما كنت تعتقد أنه ممكن.
إن فهم جميع نقاط الاتصال الفريدة لكل عميل أمر ضروري لأعمالنا. نحن نركز على بناء علاقات موثوقة ونتائج مذهلة وتجارب موثوقة مفيدة ولا تُنسى.
دعونا نفعل أشياء عظيمة معًا. لا نستطيع الانتظار للعمل معك.`}
      </p>
    </div>
    <div className="flex-1 w-1/2 max-sm:w-full justify-center items-senter">
      <SwiperAbout images={[about.imageUrl?about.imageUrl:"/test-1.jpeg"]}/>
    </div>
  </motion.div>
  );
}