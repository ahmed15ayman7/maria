'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const [selectedImage, setSelectedImage] = useState('/test-1.jpeg');

  const images = ['/test-1.jpeg', '/test-2.avif', '/test-3.jpeg', '/test-1.jpeg']; // Replace with your image URLs

  return (
    <motion.div
      className="min-h-screen flex flex-col md:flex-row items-center justify-center p-8 bg-[#01031c]/50"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex-1 text-center md:text-left mb-8 md:mb-0 md:mr-8">
        <h2 className="text-5xl font-bold mb-4 text-gold-500">About Us</h2>
        <p className="text-xl text-gray-100 max-w-2xl">
          We Work Collaboratively With Our Clients To Uncover The Most Effective And Efficient Way To Achieve Their Needs.
        </p>
        <p className="text-lg text-gray-200 max-w-2xl mt-4">
          At Farah Magazine, we believe there is a better way to meet our clients' needs. We're a company that exists to help you achieve more than you ever thought possible.
          Understanding all the unique touch-points of each client is essential to our business. We focus on building reliable connections, amazing results, and trusted experiences that are as useful as they are memorable.
          Let's do great things together. We can't wait to work with you.
        </p>
      </div>
      <div className="flex-1">
        <img
          src={selectedImage}
          alt="Selected"
          className="rounded-lg shadow-lg w-full h-auto mb-4"
        />
        <div className="flex space-x-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover cursor-pointer rounded-lg border-2 border-transparent hover:border-gold-500"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}