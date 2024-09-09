"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "@/components/shared/Loader"; // Assuming you have Loader component
import ReloadButton from "@/components/shared/reload"; // Assuming you have ReloadButton component
import { DeleteOutlined } from "@ant-design/icons"; // Import the delete icon
import { Tooltip } from "antd"; // Import Tooltip for better UX
import { toast } from "react-toastify"; // استيراد toast

export interface IContact {
  _id: string; // Add the ID field for deletion
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

async function fetchFeedbacks() {
  const { data } = await axios.get("/api/contact");
  return data;
}

// Function to delete a contact
async function deleteContact(id: string) {
  await axios.delete("/api/contact", { data: { id } });
}

export default function FeedbacksPage() {
  const { data: contacts, error, isLoading, refetch } = useQuery<IContact[]>({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
  });

  const handleDelete = async (id: string) => {
    const loadingToastId = toast.loading("جارٍ حذف الرساله..."); // إضافة إشعار التحميل
    try {
      await deleteContact(id); // Call the delete function
      refetch(); // Refresh the contacts list
      toast.update(loadingToastId, {
        render: "تم حذف الرساله بنجاح!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.error("فشل حذف الرساله:", err);
      toast.update(loadingToastId, {
        render: "فشل حذف الرساله.",
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
    <motion.div
      className="max-w-7xl mx-auto p-6"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl font-bold text-center text-gold-500 mb-8">اخر المتواصلين</h1>
      {contacts && contacts.length > 0 ? (
        <motion.div
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {contacts.map((contact, index) => (
            <motion.li
              key={index}
              className="bg-gold-500 p-6 rounded-lg shadow-md flex justify-between max-sm:justify-center items-center relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex flex-col max-sm:max-w-[200px] text-wrap max-sm:items-center">
                <h2 className="text-2xl font-semibold text-white">{contact.name}</h2>
                <p className="text-gray-100 mb-2">{contact.email}</p>
                <p className="text-gray-200">{contact.message}</p>
                <p className="text-sm text-gray-300 mt-2">{new Date(contact.createdAt).toLocaleDateString()}</p>
              </div>
              <Tooltip title="حذف">
                <button
                  className="absolute top-2 left-2 text-red-500 hover:text-red-700" // Positioning the delete icon
                  onClick={() => handleDelete(contact._id)} // Call handleDelete
                >
                  <DeleteOutlined />
                </button>
              </Tooltip>
            </motion.li>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-400">لا يوجد متواصلين</p>
      )}
    </motion.div>
  );
}
