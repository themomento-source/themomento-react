import React from "react";


function BlogCard({ img, title, author, intro }) {
  return (
    <div className="w-full max-w-[600px]  overflow-hidden cursor-pointer">
      {/* Blog Image */}
      <div className="relative w-full h-[350px]">
        <img src={img} alt={title} className="w-full h-full object-cover" />
        <p className="absolute bottom-2 left-3 text-white text-sm opacity-80">
          {author}
        </p>
      </div>

      {/* Blog Content */}
      <div className="p-5 text-gray-900">
        <h2 className="text-2xl font-semibold font-['Playfair_Display'] ">{title}</h2>
        <p className="text-gray-600 text-sm mt-2 font-['Playfair_Display']">
          {intro}
        </p>
      </div>
    </div>
  );
}

export default BlogCard;
