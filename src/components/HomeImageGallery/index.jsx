import React, { useState, useEffect } from "react";
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
    event.preventDefault(); 
    console.log("Right-click is disabled on this image.");
  };

  const handleImageClick = (id) => {
    // Handle left-click logic (e.g., navigate to product details page)
    console.log(`Left-clicked on image with ID: ${id}`);
    navigate(`/photodetails/${id}`); // Example navigation to a product details page
  };

  return (
    <div className="my-10 flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Import Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Marcellus&family=PT+Serif&display=swap"
        rel="stylesheet"
      />

      {/* Section Title */}
      <h2 className="mb-8 text-4xl font-bold text-gray-900 font-marcellus">
        Just-in Gallery
      </h2>

      {/* Masonry-style Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 w-full">
        {featuredPhotos.map((photo) => (
          <div key={photo._id} className="relative group break-inside-avoid">
            <div
              className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-zoom-in"
              onContextMenu={handleContextMenu}
              onClick={() => handleImageClick(photo._id)} 
            >
              <img
                src={photo.imageUrl} 
                alt={photo.title}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-1 font-marcellus">
                    {photo.title}
                  </h3>
                  <p className="text-sm opacity-90 font-pt-serif">
                    by {photo.author}
                  </p>
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