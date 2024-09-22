// components/Footer.tsx
"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa'; 
import { Tooltip } from 'antd';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { WiCloudy, WiDaySunny, WiDaySunnyOvercast, WiFog, WiRain, WiSnow, WiWindy } from 'react-icons/wi';

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
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState({ description: '', icon: null, color: '' });
  const weatherData = {
    "مشمس": { icon: <WiDaySunny size={24} />, color: '#FFD700' }, // أصفر مشرق
    "غائم جزئياً": { icon: <WiDaySunnyOvercast size={24} />, color: '#C0C0C0' }, // رمادي فاتح
    "ماطر": { icon: <WiRain size={24} />, color: '#00BFFF' }, // أزرق فاتح
    "عاصف": { icon: <WiWindy size={24} />, color: '#87CEEB' }, // أزرق سماوي
    "ضبابي": { icon: <WiFog size={24} />, color: '#696969' }, // رمادي داكن
    "صافي": { icon: <WiCloudy size={24} />, color: '#A9A9A9' }, // رمادي غائم
    "ثلوج": { icon: <WiSnow size={24} />, color: '#ADD8E6' }, // أزرق ثلجي
  };
  
  useEffect(() => {

    const today = new Date();
    const formattedDate = today.toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setDate(formattedDate);

    // توليد وصف الطقس ودرجة الحرارة بشكل عشوائي
    const generateRandomWeather = () => {
      const weatherKeys = Object.keys(weatherData);
      // اختر وصف طقس عشوائي
      const randomDescription =
        weatherKeys[Math.floor(Math.random() * weatherKeys.length)];
      // توليد درجة حرارة عشوائية بين 10 و 40
      const randomTemperature = (Math.random() * (40 - 10) + 10).toFixed(1);
      setWeather({
        description: `${randomDescription}, ${randomTemperature}°C`,
        // @ts-ignore
        icon: weatherData[randomDescription].icon, // الأيقونة المناسبة بناءً على الوصف
        // @ts-ignore
        color: weatherData[randomDescription].color, // اللون المناسب بناءً على الوصف
      });
    };

    generateRandomWeather();
  }, []);

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
        <p className="md:text-base text-sm md:font-normal font-light text-white flex items-center gap-2">
          {date} | <span className="md:text-base text-sm md:font-normal font-light text-white flex items-center gap-2" style={{ color: weather.color }}>{weather.icon} {weather.description}</span>
        </p>
        {/* Copyright */}
        <p className="md:text-base text-sm md:font-normal font-light text-white">
          Copyright © 2024 Maria.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
