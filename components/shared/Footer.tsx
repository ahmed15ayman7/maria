// components/Footer.tsx
"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa'; 
import { Tooltip } from 'antd';
import { Loader } from 'lucide-react';

// تعريف النوع لروابط السوشيال ميديا
interface SocialLinks {
  platform:string;
  url:string;
  
}

const fetchSocialLinks = async (): Promise<any> => {
  const res = await axios.get<SocialLinks>('/api/social-links');
  return res.data;
};

const Footer: React.FC = () => {
  const { data: socialLinks, error, isLoading } = useQuery<SocialLinks[]>({queryKey:['socialLinks'], queryFn:()=>fetchSocialLinks()});

  if (isLoading) return <Loader/>;
  // if (error) return <div>حدث خطأ أثناء تحميل الروابط.</div>;
console.log(socialLinks)
  return (
    <footer className="w-full pt-7 pb-10 bg-[#292829]" id="contact">
      <div className="flex flex-col justify-between items-center mt-16 space-y-5">
        {/* أيقونات وسائل التواصل الاجتماعي */}
        <div className="flex gap-8">
          <Tooltip title="فيسبوك">
            <a href={socialLinks?.map(e=>e.platform==="facebook"?e.url:undefined).filter(e=>e!==undefined)[0] || '#'} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaFacebookF size={24} />
            </a>
          </Tooltip>
          <Tooltip title="إنستغرام">
            <a href={ socialLinks?.map(e=>e.platform==="instagram"?e.url:undefined).filter(e=>e!==undefined)[0] || '#'} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
          </Tooltip>
          <Tooltip title="تيك توك">
            <a href={socialLinks?.map(e=>e.platform==="tiktok"?e.url:undefined).filter(e=>e!==undefined)[0]|| '#'} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaTiktok size={24} />
            </a>
          </Tooltip>
          <Tooltip title="تويتر">
            <a href={ socialLinks?.map(e=>e.platform==="twitter"?e.url:undefined).filter(e=>e!==undefined)[0]|| '#'} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
