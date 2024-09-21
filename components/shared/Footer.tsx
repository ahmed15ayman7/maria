// components/Footer.tsx
"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa'; 

// تعريف النوع لروابط السوشيال ميديا
interface SocialLinks {
  facebook: string;
  instagram: string;
  tiktok: string;
  twitter: string;
}

const Footer: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: '',
    instagram: '',
    tiktok: '',
    twitter: '',
  });

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const res = await axios.get<SocialLinks>('/api/social-links');
        setSocialLinks(res.data);
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };
    fetchSocialLinks();
  }, []);

  return (
    <footer className="w-full pt-7 pb-10 bg-[#292829]" id="contact">
      <div className="flex flex-col justify-between items-center mt-16 space-y-5">
        {/* Social Media Icons */}
        <div className="flex gap-8">
          <a href={socialLinks.facebook || '#'} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaFacebookF size={24} />
          </a>
          <a href={socialLinks.instagram || '#'} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaInstagram size={24} />
          </a>
          <a href={socialLinks.tiktok || '#'} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaTiktok size={24} />
          </a>
          <a href={socialLinks.twitter || '#'} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
