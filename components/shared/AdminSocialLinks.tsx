// app/admin/social-links/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Input, Button, Table } from "antd";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion"; // استيراد Framer Motion

// تعريف النوع لروابط السوشيال ميديا
interface SocialLinkData {
  platform: string;
  url: string;
}

const AdminSocialLinks: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinkData[]>([]);
  const [newLink, setNewLink] = useState<SocialLinkData>({ platform: "facebook", url: "" });

  const fetchSocialLinks = async () => {
    try {
      const res = await axios.get<SocialLinkData[]>('/api/social-links');
      setSocialLinks(res.data);
    } catch (error) {
      toast.error('يوجد خطا ما في جلب اللينكات');
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const updateLink = async () => {
    try {
      await axios.post('/api/social-links', newLink);
      setNewLink({ platform: newLink.platform, url: "" });
      toast.success('تم تحديث اللينك بنجاح');
      fetchSocialLinks();
    } catch (error) {
      toast.error("يوجد خطا ما في ادخال البيانات");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <motion.h1
        className="text-2xl font-bold mb-4 text-gold-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        تعديل السوشيال ميديا
      </motion.h1>
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <select
          value={newLink.platform}
          onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
          className="mb-2 md:mb-0 text-black md:mr-4 p-2 border border-gray-300 rounded"
        >
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="twitter">Twitter</option>
        </select>
        <Input
          placeholder="URL"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          className="mb-2 md:mb-0 p-2 border border-gray-300 rounded"
        />
        <Button 
          onClick={updateLink} 
          className="bg-gold-500 text-white hover:bg-gold-600 transition duration-300"
        >
          Update Link
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Table 
          dataSource={socialLinks} 
          rowKey="_id" 
          pagination={false} // عدم عرض صفحة
          className="bg-white rounded shadow"
        >
          <Table.Column title="Platform" dataIndex="platform" />
          <Table.Column title="URL" dataIndex="url" />
        </Table>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default AdminSocialLinks;
