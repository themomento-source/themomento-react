import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import { normalizeFancyText } from "../../utils/normalizeFancyText";

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

  const handleImageClick = (e) => {
    e.stopPropagation(); // Prevent closing the modal when the image is clicked
  };

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
                onClick={() => setIsModalOpen(true)}
              />
            </div>

            {/* Details Below Image */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-marcellus">
                {normalizeFancyText(photoOfTheDay.title)}
              </h2>
              <p className="text-gray-900 text-sm md:text-base mb-4 leading-relaxed font-pt-serif max-w-2xl mx-auto">
                {normalizeFancyText(photoOfTheDay.description)}
              </p>
              {/* <p className="text-gray-600 text-xs italic font-pt-serif">
                Photo by {photoOfTheDay.user?.name || "Momento User"}
              </p> */}


{photoOfTheDay.user && (
  <p className="text-gray-600  italic font-pt-serif text-s">
    Photo by{" "}
    <Link
      to={`/user/${photoOfTheDay.user._id}`}
      className="text-blue-600 hover:underline"
    >
      {photoOfTheDay.user.name || "Momento User"}
    </Link>
  </p>
)}


            </div>
          </div>
        </>
      ) : (
        <p className="text-white text-center text-xl">No Photo of the Day Available</p>
      )}
 {isModalOpen && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-auto"
    onClick={() => setIsModalOpen(false)}
  >
    <div className="relative">
      <button
        className="absolute -top-10 right-0 text-white hover:text-amber-200 transition-colors"
        onClick={(e) => {
          e.stopPropagation(); 
          setIsModalOpen(false);
        }}
      >
        <FaTimes className="text-3xl" />
      </button>
      <img
        src={photoOfTheDay.images[0]?.url}
        alt={photoOfTheDay.title}
        onClick={handleImageClick}
        className="block max-w-full max-h-screen w-auto h-auto"
      />
    </div>
  </div>
)}

{/* {photoOfTheDay && (
  <div className="mt-8 flex justify-center gap-4 flex-wrap">
    <FacebookShareButton
     url={"https://themomento.co.uk/"}
      quote={photoOfTheDay.title}
    >
      <FacebookIcon size={40} round />
    </FacebookShareButton>

    <TwitterShareButton
     url={"https://themomento.co.uk/"}
      title={photoOfTheDay.title}
    >
      <TwitterIcon size={40} round />
    </TwitterShareButton>

    <WhatsappShareButton
      url={"https://themomento.co.uk/"}
      title={photoOfTheDay.title}
    >
      <WhatsappIcon size={40} round />
    </WhatsappShareButton>

    <LinkedinShareButton
      url={"https://themomento.co.uk/"}
      title={photoOfTheDay.title}
      summary={photoOfTheDay.description}
      source="Momento"
    >
      <LinkedinIcon size={40} round />
    </LinkedinShareButton>
  </div>
)} */}


    </div>

   
  
  );
};

export default PhotoOfTheDay;
