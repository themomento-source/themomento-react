import React from "react";
import { BsCartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

function ImageCard({ id, img, title, author, price, icon1, icon2 }) {
  return (
    <div className="relative group w-full max-w-[600px] h-[600px] overflow-hidden rounded-lg hover:cursor-pointer">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-all duration-300 transform group-hover:scale-110"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
        <p className="text-sm">Seller: {author}</p>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-300">{price + "$"}</p>
        </div>
        <div className="flex gap-5 justify-center">
          {icon1} {icon2}
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
