import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import axios from "axios";
import PencilIcon from "../cards/PencilIcon";
import { Dialog } from "@headlessui/react";
import "react-image-crop/dist/ReactCrop.css";
import { NewsFormInputs, newsSchema } from "@/lib/validation/news";
import Modal from "@/components/cards/Modal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function AddNewsForm({
  refetch,
  isEdit,
  news,
}: {
  refetch: () => void;
  isEdit?: boolean;
  news?: {
    title: string;
    content: string;
    author: string;
    publishedAt: Date;
    category: string;
    imageUrl?: string;
    _id: string;
  };
}) {
  const avatarUrl = useRef("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<NewsFormInputs>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: news?.title || "",
      content: news?.content || "",
      author: news?.author || "",
      category: news?.category || "",
      imageUrl: news?.imageUrl || "",
    },
  });

  const updateAvatar = (imgSrc: string) => {
    avatarUrl.current = imgSrc;
    setValue("imageUrl", imgSrc);
  };

  const onSubmit = async (data: NewsFormInputs) => {
    const loadingToastId = toast.loading(
      isEdit ? "Editing news..." : "Adding news..."
    ); // Show loading toast

    try {
      await axios.post(
        "/api/news",
        isEdit ? { ...data, _id: news!._id } : data
      );
      toast.update(loadingToastId, {
        render: isEdit
          ? " News edited successfully!"
          : "News added successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      reset();
      updateAvatar("");
      refetch();
    } catch (error) {
      toast.update(loadingToastId, {
        render: isEdit ? "Failed to edit news" : "Failed to add news",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto p-6 mb-4 rounded-lg shadow-md"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}>
      <h2 className="text-2xl text-gold-500 font-bold mb-4">اضافة خبر</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gold-500">العنوان</label>
          <input
            {...register("title")}
            type="text"
            className="w-full border text-gray-900 border-gray-300 p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gold-500">المقال</label>
          <textarea
            {...register("content")}
            className="w-full border text-gray-900 border-gray-300 p-2 rounded"
          />
          {errors.content && (
            <p className="text-red-600">{errors.content.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gold-500">المؤلف</label>
          <input
            type="text"
            {...register("author")}
            className="w-full border text-gray-900 border-gray-300 p-2 rounded"
          />
          {errors.author && (
            <p className="text-red-600">{errors.author.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gold-500">الفئة</label>
          <input
            type="text"
            {...register("category")}
            className="w-full border text-gray-900 border-gray-300 p-2 rounded"
          />
          {errors.category && (
            <p className="text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div className="mb-4 relative">
          {((news&&news.imageUrl)||avatarUrl.current) && (
            <div className="mt-4">
              <p>العرض:</p>
              <img
                src={news&&news.imageUrl?news.imageUrl:avatarUrl.current}
                alt="Avatar"
                className="w-[300px] h-[300px] rounded-xl border-2 border-gold-500"
              />
            </div>
          )}
          <button
            className="flex items-center gap-3 -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full border border-gray-600 bg-gold-500 text-white hover:bg-yellow-600 transition"
            title="Change photo"
            onClick={(e) => {
              e.preventDefault();
              setIsDialogOpen(true);
            }}>
            {!((news&&news.imageUrl)||avatarUrl.current) ? "Upload Image" : "Change Image"} <PencilIcon />
          </button>
        </div>

        {/* Cropper Dialog */}
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          className="relative z-[10000]">
          <div className="fixed inset-0  bg-opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white p-6 rounded-lg">
              <Modal
                updateAvatar={updateAvatar}
                closeModal={() => setIsDialogOpen(false)}
              />
            </Dialog.Panel>
          </div>
        </Dialog>
        <div className="flex flex-col w-full p-3 items-center">
          <button
            type="submit"
            className="bg-gold-500 w-full  text-white px-4 py-2 rounded hover:bg-gold-500/90 transition">
            اضافة
          </button>
        </div>
      </form>
    </motion.div>
  );
}
