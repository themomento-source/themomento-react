import React from "react";
import { BsCartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ImageCard({ 
  id, 
  img, 
  title, 
  author, 
  price, 
  type = "product", 
  onSelect,
  status,
  publishedDate 
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "dayphoto") {
      onSelect?.(); // Open modal for day photos
    } else {
      navigate(`/photodetails/${id}`); 
    }
  };

  return (
    <div 
      className="relative group w-full max-w-[600px] h-auto overflow-hidden hover:cursor-pointer flex items-center justify-center bg-gray-100"
      onClick={handleClick}
      style={{
        aspectRatio: "auto", // Automatically adjust the height based on the image aspect ratio
      }}
    >
      <img
        src={img}
        alt={title}
        className="w-auto h-auto max-w-full max-h-full object-contain"
        style={{
          display: "block", // Ensure there’s no extra space around the image
        }}
      />

      {/* Photo of the Day Badge */}
      {type === "dayphoto" && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1  text-sm flex items-center gap-1">
          <span>🌟</span>
          <span>Photo of the Day</span>
        </div>
      )}

      {/* Approval Status Badge */}
      {status && (
        <div className={`absolute top-2 left-2 px-3 py-1 text-sm ${
          status === "approved" ? "bg-green-500" : "bg-yellow-500"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      )}

      {/* Overlay Text */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div>
          {type === "dayphoto" && publishedDate && (
            <p className="text-sm text-gray-300 mb-1">
              Featured on: {new Date(publishedDate).toLocaleDateString()}
            </p>
          )}
          <p className="text-sm text-white">Seller: {author}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {/* {type === "product" && (
            <p className="text-gray-300 text-lg font-medium">{price}$</p>
          )} */}
        </div>
        
        <div className="flex gap-5 justify-center">
          {type === "product" && (
            <>
              <BsCartFill className="text-2xl text-white hover:text-blue-400 transition-colors" />
              <FaRegHeart className="text-2xl text-white hover:text-red-400 transition-colors" />
            </>
          )}
          {type === "dayphoto" && (
            <button className="text-white border border-white px-4 py-2  hover:bg-white hover:text-black transition-colors">
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageCard;