import React, { useState, useEffect } from "react";
import { BsCartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";

function PhotoListing() {
  const [allPhotos, setAllPhotos] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchAllPhotos = async () => {
      try {
        const data = await fetchDataFromApi("/api/product/all-product");
        if (data && data.products) {
          setAllPhotos(data.products); // Assuming API returns products in the "products" key
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };
    fetchAllPhotos();
  }, []);

  const handleImageClick = (id) => {
    navigate(`/photodetails/${id}`); // Navigate to the photo details page
  };

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default right-click menu
    console.log("Right-click is disabled on image.");
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="container mx-auto text-center mb-12 px-4">
        <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">
          Premium Stock Photography
        </h2>
        <p className="text-gray-600 text-lg m-6">
          Discover exceptional images for your creative projects
        </p>
      </div>

      {/* Masonry-style Grid */}
      <div className="container mx-auto px-4">
        <div className="columns-1 sm:columns-1 lg:columns-2 xl:columns-2 gap-6 space-y-6">
          {allPhotos.map((photo) => (
            <div
              key={photo._id}
              className="relative group break-inside-avoid"
              onClick={() => handleImageClick(photo._id)} // Ensure navigation on click
            >
              <div
                className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-zoom-in"
                onContextMenu={handleContextMenu} // Prevent right-click on image
              >
                <img
                  src={photo.imageUrl || "default-image-url.jpg"} // Ensure valid image URL
                  alt={photo.title}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-1">{photo.title}</h3>
                    <p className="text-sm opacity-90">by {photo.author}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-semibold">${photo.price}</span>
                      <div className="flex gap-3">
                        <button
                          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle cart logic here
                          }}
                        >
                          <BsCartFill className="text-xl" />
                        </button>
                        <button
                          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle favorite logic here
                          }}
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
    </section>
  );
}

export default PhotoListing;
