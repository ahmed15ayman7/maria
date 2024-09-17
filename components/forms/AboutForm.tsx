import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useRef } from 'react';
import axios from 'axios';
import PencilIcon from "../cards/PencilIcon";
import { Dialog } from '@headlessui/react';
import 'react-image-crop/dist/ReactCrop.css';
import Modal from '@/components/cards/Modal';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { AboutFormInputs, aboutSchema } from '@/lib/validation/about';

export default function AboutForm({refetch}:{refetch:()=>void}) {
  const avatarUrl = useRef("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<AboutFormInputs>({
    resolver: zodResolver(aboutSchema),
  });

  const updateAvatar = (imgSrc: string) => {
    avatarUrl.current = imgSrc;
    setValue("imageUrl", imgSrc);
  };

  const onSubmit = async (data: AboutFormInputs) => {
    const loadingToastId = toast.loading('Adding news...'); // Show loading toast

    try {
      await axios.post('/api/about', data);
      toast.update(loadingToastId, { render: 'About added successfully!', type: 'success', isLoading: false, autoClose: 3000 });
      reset()
      updateAvatar("")
      refetch()
    } catch (error) {
      toast.update(loadingToastId, { render: 'Failed to add About', type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  return (
    <motion.div 
      className="max-w-lg mx-auto p-6 mb-4 rounded-lg shadow-md"
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl text-gold-500 font-bold mb-4">تعديل من نحن </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gold-500">العنوان</label>
          <textarea
            {...register('title')}
            className="w-full border text-gray-900 border-gray-300 p-2 rounded"
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gold-500">المعلومات</label>
          <textarea
            {...register('details')}
            className="w-full border text-gray-900 border-gray-300 p-2 rounded"
          />
          {errors.details && <p className="text-red-600">{errors.details.message}</p>}
        </div>


        <div className="mb-4 relative">
          {avatarUrl.current && (
            <div className="mt-4">
              <p>العرض:</p>
              <img
                src={avatarUrl.current}
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
            }}
          >
            {avatarUrl.current ? "Upload Image" : "Change Image"} <PencilIcon />
          </button>
        </div>

        {/* Cropper Dialog */}
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-[10000]">
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
          className="bg-gold-500 w-full  text-white px-4 py-2 rounded hover:bg-gold-500/90 transition"
          >
          تعديل 
        </button>
          </div>
      </form>
    </motion.div>
  );
}
