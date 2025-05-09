import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { FaTimes } from "react-icons/fa";

const PhotoOfTheDay = () => {
  const [photoOfTheDay, setPhotoOfTheDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPhotoOfTheDay = async () => {
      try {
        const response = await fetchDataFromApi("/api/photo/photo-of-the-day");
        if (response?.photoOfTheDay) {
          setPhotoOfTheDay(response.photoOfTheDay);
        } else {
          console.error("No photo of the day found");
        }
      } catch (error) {
        console.error("Error fetching photo of the day:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoOfTheDay();
  }, []);

  return (
    <div className="bg-gray-50 px-4 py-8 md:px-8 border-t-4 border-b-4 border-black">
      {loading ? (
        <p className="text-gray-900 text-center text-xl">Loading Photo of the Day...</p>
      ) : photoOfTheDay ? (
        <>
          {/* Header Section - Centered */}
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-gray-900 py-3 mb-2 font-bold font-marcellus text-xl md:text-2xl uppercase tracking-wide">
              Today’s Best Click
            </div>
            <div className="text-md text-gray-900 mb-6 font-pt-serif">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Photo Content Section */}
          <div className="max-w-7xl mx-auto">
            {/* Image Section */}
            <div className="relative w-full aspect-[4/3] mb-4">
              <img
                src={photoOfTheDay.images[0]?.url}
                alt={photoOfTheDay.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Details Below Image */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-marcellus">
                {photoOfTheDay.title}
              </h2>
              <p className="text-gray-900 text-sm md:text-base mb-4 leading-relaxed font-pt-serif max-w-2xl mx-auto">
                {photoOfTheDay.description}
              </p>
              <p className="text-gray-600 text-xs italic font-pt-serif">
                Photo by {photoOfTheDay.user?.name || "Momento User"}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-white text-center text-xl">No Photo of the Day Available</p>
      )}
    </div>
  );
};

export default PhotoOfTheDay;