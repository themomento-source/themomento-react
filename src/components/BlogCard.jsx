import React from "react";
import { useNavigate } from "react-router-dom";
import SafeHTML from "./SafeHTML";
import { format } from 'date-fns';

function BlogCard({ img, title, author, _id, categories, createdAt, intro }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${_id}`);
  };

  // Safe date formatting
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date) ? 'No date' : format(date, 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div
      className="w-full bg-white shadow-md  overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
      onClick={handleClick}
    >
      {/* Blog Image */}
      <div className="relative w-full h-58">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {/* Category Tags */}
        <div className="absolute top-2 left-2 flex gap-2">
          {categories?.map?.(category => (
            <span 
              key={category}
              className="px-3 py-1 hidden bg-amber-100 text-amber-700 rounded-full text-sm font-medium"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2 font-marcellus text-gray-800 hover:text-amber-600 transition-colors duration-300">
          {title}
        </h2>
        
        {intro && (
            <div className="text-gray-600 mb-4 line-clamp-3 font-pt-serif flex-grow">
              <SafeHTML html={intro} />
            </div>
        )}

        <div className="flex items-center text-sm border-t pt-4 mt-auto">
          <span className="text-gray-500 font-medium">
            By {author || 'Unknown Author'}
          </span>
          <span className="text-gray-500 ml-auto">
            {formatDate(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;