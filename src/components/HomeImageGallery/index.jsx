import React, { useState, useEffect } from "react";
import { BsCartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";

function HomeImageGallery() {
  const [featuredPhotos, setFeaturedPhotos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedPhotos = async () => {
      try {
        const data = await fetchDataFromApi("/api/product/featured/products");
        if (data && data.products) {
          setFeaturedPhotos(data.products);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching featured photos:", error);
      }
    };
    fetchFeaturedPhotos();
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent right-click
    console.log("Right-click is disabled on this image.");
  };

  const handleImageClick = (id) => {
    // Handle left-click logic (e.g., navigate to product details page)
    console.log(`Left-clicked on image with ID: ${id}`);
    navigate(`/photodetails/${id}`);// Example navigation to a product details page
  };

  return (
    <div className="my-10 flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-4xl font-bold text-gray-900 font-serif">
        Discover Premium Photography
      </h2>

      {/* Masonry-style Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 w-full">
        {featuredPhotos.map((photo) => (
          <div key={photo._id} className="relative group break-inside-avoid">
            <div
              className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-zoom-in"
              onContextMenu={handleContextMenu}
              onClick={() => handleImageClick(photo._id)} // Left-click functionality
            >
              <img
                src={photo.imageUrl} // Assuming API provides imageUrl
                alt={photo.title}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-1">{photo.title}</h3>
                  <p className="text-sm opacity-90">by {photo.author}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-semibold">
                      ${photo.price}
                    </span>
                    <div className="flex gap-3">
                      <button
                        className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <BsCartFill className="text-xl" />
                      </button>
                      <button
                        className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaRegHeart className="text-xl text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeImageGallery;
