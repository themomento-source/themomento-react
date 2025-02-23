import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";

const PhotoOfTheDay = () => {
  const [photoOfTheDay, setPhotoOfTheDay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotoOfTheDay = async () => {
      try {
        const response = await fetchDataFromApi("/api/dayphoto/latest-approved");
        if (response?.photo) {
          setPhotoOfTheDay(response.photo);
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
    <div className="bg-black py-16 px-4 md:px-8 mb-16">
      {loading ? (
        <p className="text-white text-center text-xl">Loading Photo of the Day...</p>
      ) : photoOfTheDay ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Photo Section - 80% width */}
          <div className="md:col-span-10">
            <img
              src={photoOfTheDay.image.url}
              alt={photoOfTheDay.title}
              className="w-full h-[50vh] md:h-[70vh] object-cover shadow-2xl"
            />
          </div>

          {/* Details Section - 20% width */}
          <div className="md:col-span-2">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-marcellus">
                {photoOfTheDay.title}
              </h2>
              <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed font-pt-serif">
                {photoOfTheDay.description}
              </p>
              <p className="text-gray-400 text-xs italic font-pt-serif">
                Photo by {photoOfTheDay.user?.name || "Unknown Photographer"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white text-center text-xl">No Photo of the Day Available</p>
      )}
    </div>
  );
};

export default PhotoOfTheDay;