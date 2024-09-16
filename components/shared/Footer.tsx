"use client";
import { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { WiDaySunny, WiCloudy, WiRain, WiWindy, WiFog, WiSnow, WiDaySunnyOvercast } from 'react-icons/wi'; // أيقونات الطقس

const Footer = () => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState({ description: '', icon: null, color: '' });

  // قائمة عشوائية للأوصاف الخاصة بالطقس وأيقوناتها وألوانها
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
    // Get today's date in Arabic format
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

  return (
    <footer className="w-full pt-7 pb-10 bg-[#292829]" id="contact">
      <div className="flex flex-col justify-between items-center mt-16 space-y-5">
        {/* Social Media Icons */}
        <div className="flex gap-8">
          {[
            { href: "https://www.tiktok.com", icon: <FaTiktok size={24} />, label: "TikTok" },
            { href: "https://www.facebook.com", icon: <FaFacebookF size={24} />, label: "Facebook" },
            { href: "https://www.instagram.com", icon: <FaInstagram size={24} />, label: "Instagram" },
            { href: "https://www.x.com", icon: <FaTwitter size={24} />, label: "X" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
        {/* Date and Weather */}
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
