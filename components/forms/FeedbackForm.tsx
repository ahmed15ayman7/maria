// components/FeedbackForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import axios from "axios";
import { FeedbackFormInputs, feedbackSchema } from "@/lib/validation/feedback";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

export default function FeedbackForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FeedbackFormInputs>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data: FeedbackFormInputs) => {
    const loadingToastId = toast.loading("Submitting feedback..."); // Show loading toast

    try {
      await axios.post("/api/feedback", data);
      toast.update(loadingToastId, {
        render: "Feedback submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      reset()
    } catch (error) {
      toast.update(loadingToastId, {
        render: "Failed to submit feedback. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <motion.form
      className="flex flex-col p-6 shadow-lg rounded-lg max-w-md mx-auto"
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <h2 className="text-3xl font-bold text-center mb-6 text-gold-500">Your Feedback</h2>

      <label className="mb-4">
        <span className="block mb-2 font-semibold text-gray-100">Name:</span>
        <input
          type="text"
          className={`border p-3 text-gray-900 rounded-md w-full transition duration-300 ease-in-out ${
            errors.name ? "border-red-500" : "border-gray-300 focus:border-gold-500"
          }`}
          {...register("name")}
          placeholder="Your Name"
        />
        {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
      </label>

      <label className="mb-4">
        <span className="block mb-2 font-semibold text-gray-100">Email:</span>
        <input
          type="email"
          className={`border p-3 rounded-md text-gray-900 w-full transition duration-300 ease-in-out ${
            errors.email ? "border-red-500" : "border-gray-300 focus:border-gold-500"
          }`}
          {...register("email")}
          placeholder="Your Email"
        />
        {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
      </label>

      <label className="mb-4">
        <span className="block mb-2 font-semibold text-gray-100">Message:</span>
        <textarea
          className={`border p-3 text-gray-900 rounded-md w-full transition duration-300 ease-in-out ${
            errors.message ? "border-red-500" : "border-gray-300 focus:border-gold-500"
          }`}
          {...register("message")}
          rows={4}
          placeholder="Your Message"
        />
        {errors.message && <p className="text-red-500 mt-1">{errors.message.message}</p>}
      </label>

      <button
        type="submit"
        className="bg-gold-500 text-white py-2 rounded-md hover:bg-gold-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-opacity-50">
        Send
      </button>

   
    </motion.form>
  );
}
