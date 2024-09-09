// app/feedback/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "@/components/shared/Loader";
import ReloadButton from "@/components/shared/reload";
import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { toast } from "react-toastify"; // استيراد toast

interface IFeedback {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

// Fetch feedbacks
async function fetchFeedbacks() {
  const { data } = await axios.get("/api/feedback");
  return data;
}

// Delete feedback
async function deleteFeedback(id: string) {
  await axios.delete("/api/feedback", { data: { id } });
}

export default function FeedbackList() {
  // Fetch feedbacks
  const { data: feedbacks, error, isLoading, refetch } = useQuery<IFeedback[]>({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
  });

  // Handle delete feedback
  const handleDelete = async (id: string) => {
    const loadingToastId = toast.loading("جارٍ حذف التعليق..."); // إضافة إشعار التحميل
    try {
      await deleteFeedback(id); // حذف التعليق
      refetch(); // تحديث قائمة التعليقات
      toast.update(loadingToastId, {
        render: "تم حذف التعليق بنجاح!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.error("فشل حذف التعليق:", err);
      toast.update(loadingToastId, {
        render: "فشل حذف التعليق.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ReloadButton />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gold-500 mb-8">اخر الاعلانات</h1>

      {feedbacks && feedbacks.length > 0 ? (
        <motion.ul
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {feedbacks.map((feedback, index) => (
            <motion.li
              key={index}
              className="bg-gold-500 p-6 rounded-lg shadow-md flex justify-between max-sm:justify-center items-center relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex flex-col max-sm:max-w-[200px] text-wrap max-sm:items-center">
                <h2 className="text-2xl font-semibold text-white">{feedback.name}</h2>
                <p className="text-gray-100 mb-2">{feedback.email}</p>
                <p className="text-gray-200">{feedback.message}</p>
                <p className="text-sm text-gray-900 mt-2">{new Date(feedback.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Delete Icon on the top left */}
              <Tooltip title="حذف">
                <button
                  className="absolute top-2 left-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(feedback._id)} // Call handleDelete
                >
                  <DeleteOutlined />
                </button>
              </Tooltip>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="text-center text-gray-400">لا يوجد اعلانات</p>
      )}
    </div>
  );
}
