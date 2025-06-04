import React from "react";
import { useNavigate } from "react-router-dom";
import SafeHTML from "./SafeHTML";
import { format } from 'date-fns';

function BlogCard({ img, title, author, intro, _id, categories, createdAt }) {
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
      className="w-full bg-white shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
      onClick={handleClick}
    >
      {/* Blog Image */}
      <div className="relative w-full h-48">
        <img 
          src={img} 
          alt={title} 
          className="w-[400px] h-full object-cover"
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
        <p className="hidden absolute bottom-2 left-3 text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
  {author || 'Unknown Author'}
</p>
      </div>

      {/* Blog Content */}
      <div className="p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-3 font-marcellus text-gray-800">
          {title}
        </h2>
        
        <div className="text-gray-600 mb-4 line-clamp-3 font-pt-serif">
          <SafeHTML html={intro} />
        </div>

  

        <div className="hidden flex items-center justify-between text-sm border-t pt-3">
          <span className="text-gray-500">
            {formatDate(createdAt)}
          </span>
          <span className="text-amber-600 hover:text-amber-700 font-medium">
            Read More →
          </span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;