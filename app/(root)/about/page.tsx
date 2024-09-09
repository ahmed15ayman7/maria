'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SwiperAbout from '@/components/shared/SwiperAbout';

export default function About() {
  const [selectedImage, setSelectedImage] = useState('/test-1.jpeg');

  const images = ['/test-1.jpeg', '/test-2.avif', '/test-3.jpeg', '/test-1.jpeg']; // Replace with your image URLs

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
        نحن نعمل بشكل تعاوني مع عملائنا لاكتشاف الطريقة الأكثر فعالية وكفاءة لتحقيق احتياجاتهم.
        </p>
        <p className="text-lg text-gray-200 max-w-2xl max-sm:max-w-[300px] mt-4">
        في مجلة مريه، نؤمن بوجود طريقة أفضل لتلبية احتياجات عملائنا. نحن شركة موجودة لمساعدتك على تحقيق أكثر مما كنت تعتقد أنه ممكن.
إن فهم جميع نقاط الاتصال الفريدة لكل عميل أمر ضروري لأعمالنا. نحن نركز على بناء علاقات موثوقة ونتائج مذهلة وتجارب موثوقة مفيدة ولا تُنسى.
دعونا نفعل أشياء عظيمة معًا. لا نستطيع الانتظار للعمل معك.
        </p>
      </div>
      <div className="flex-1 w-1/2 max-sm:w-full">
        <SwiperAbout images={images}/>
        {/* <img
          src={selectedImage}
          alt="Selected"
          className="rounded-lg shadow-lg w-full h-auto mb-4"
        /> */}
        {/* <div className="flex space-x-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover cursor-pointer rounded-lg border-2 border-transparent hover:border-gold-500"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div> */}
      </div>
    </motion.div>
  );
}