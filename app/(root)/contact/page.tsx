'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContactFormInputs, contactSchema } from "@/lib/validation/contact";

export default function Contact() {
  const { register, handleSubmit, formState: { errors } ,reset} = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ContactFormInputs) => {
    const loadingToastId = toast.loading("Sending message...");

    setLoading(true);
    try {
      await axios.post("/api/contact", data);
      toast.update(loadingToastId, {
        render: "Message sent successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
      reset()
    } catch (error) {
      toast.update(loadingToastId, {
        render: "Failed to send message.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#292829]/30 text-white"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-5xl font-bold mb-8 text-gold-500">تواصل معنا</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
        <div>
          <label className="block mb-2 text-sm font-bold">الاسم</label>
          <input
            type="text"
            className={`w-full px-4 py-2 rounded-lg text-gray-800 ${
              errors.name ? "border-red-500" : ""
            }`}
            {...register("name")}
            required
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold">البريد الاكتروني</label>
          <input
            type="email"
            className={`w-full px-4 py-2 rounded-lg text-gray-800 ${
              errors.email ? "border-red-500" : ""
            }`}
            {...register("email")}
            required
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-bold">محتوي الرساله</label>
          <textarea
            className={`w-full px-4 py-2 rounded-lg text-gray-800 ${
              errors.message ? "border-red-500" : ""
            }`}
            rows={4}
            {...register("message")}
            required
          />
          {errors.message && <p className="text-red-500 mt-1">{errors.message.message}</p>}
        </div>
        <motion.button
          className="w-full py-3 bg-gold-500 text-white rounded-lg text-lg font-semibold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
        >
          {loading ? "جاري الارسال..." : "إرسال"}
        </motion.button>
      </form>
    </motion.div>
  );
}
