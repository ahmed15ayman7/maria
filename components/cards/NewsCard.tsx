"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for the toast notifications
import { DeleteOutlined } from '@ant-design/icons'; // Import the delete icon

interface NewsCardProps {
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  isAdmin?: boolean; // Add this prop to determine if the user is an admin
  newsId?: string; // Pass the news ID for deletion
  onDelete?: (id: string) => void; // Callback to handle deletion in parent component
}

const NewsCard: React.FC<NewsCardProps> = ({ title, content, author, publishedAt, imageUrl, isAdmin, newsId, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (newsId: string) => {
    const loadingToastId = toast.loading('Deleting news...'); // Show loading toast

    if (!confirm("Are you sure you want to delete this news article?")) {
      toast.dismiss(loadingToastId); // Dismiss the loading toast if the user cancels
      return;
    }

    try {
      const response = await fetch(`/api/news/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: newsId }), // Send the news ID to delete
      });

      if (!response.ok) {
        throw new Error("Failed to delete news article");
      }

      // Show success toast notification
      toast.update(loadingToastId, { render: 'News deleted successfully!', type: 'success', isLoading: false, autoClose: 3000 });

      // Call the onDelete callback to remove the card from the UI
      onDelete && onDelete(newsId);
    } catch (error) {
      console.error("Error deleting news:", error);
      // Show error toast notification
      toast.update(loadingToastId, { render: 'Failed to delete news article', type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  return (
    <div className="bg-white/30 max-w-[100vm] rounded-lg relative"> {/* Added relative positioning */}
      {isAdmin && (
        <div className="absolute top-2 left-2 cursor-pointer" onClick={() => handleDelete(newsId ? newsId : "")}>
          <DeleteOutlined style={{ fontSize: '20px', color: 'red' }} />
        </div>
      )}
      <motion.div
        className="bg-gold-500/40 rounded-lg flex max-sm:flex-col max-sm:justify-center flex-row-reverse shadow-lg p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-1/2 h-full max-h-[50vh] max-w-[200px] object-cover max-sm:justify-center max-sm:flex max-sm:rounded-t-lg rounded-r-lg"
          />
        )}
        <div className={!imageUrl ? "" : "p-4 w-1/2"}>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-gray-200 mb-4">{content}</p>
          <p className="text-sm text-gray-300">
            By {author} | {new Date(publishedAt).toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsCard;