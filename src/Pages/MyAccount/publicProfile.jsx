import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import {
  MdLocationOn,
  MdBlurOn,
  MdLink,
  MdClose,
  MdShare
} from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import SafeHTML from "../../components/SafeHTML";
import ImageCard from "../../components/ImageCard";

const PublicProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [profileData, setProfileData] = useState({
    user: {},
    photos: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const dropdownRef = useRef(null);

 
  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const [userResponse, photosResponse] = await Promise.all([
          fetchDataFromApi(`/api/user/${userId}/public`),
          fetchDataFromApi(`/api/photo/user/${userId}`),
        ]);

        // Transform photos from the API response
        const transformedPhotos = (photosResponse?.photos || []).map(photo => ({
          type: 'photo',
          id: photo._id,
          img: photo.images[0]?.url, // Access the first image URL
          title: photo.title,
          description: photo.description,
          author: userResponse?.data?.name || 'Unknown Artist', // Ensure user data is available
          createdAt: photo.createdAt,
        }));

        setProfileData({
          user: userResponse?.data || {},
          photos: transformedPhotos.sort((a, b) =>
            new Date(b.createdAt || b.publishedDate) - new Date(a.createdAt || a.publishedDate)
          )
        });
      } catch (error) {
        setError(error.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, [userId]);


  const handleShare = async () => {
    const profileUrl = window.location.href;
    const shareText = `Check out ${profileData.user.name}'s profile on The Momento!`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profileData.user.name}'s Profile`,
          text: shareText,
          url: profileUrl,
        });
      } else {
        setShowShareDropdown(!showShareDropdown);
      }
    } catch (error) {
      console.error('Sharing failed:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
    };

    if (showShareDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareDropdown]);

  const handlePhotoClick = (item) => {
    navigate(`/photodetails/${item.id}`);
  };

  if (loading) {
    return <div className="flex justify-center mt-4 min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto mt-8 flex justify-center">
        <div className="alert alert-error mb-3">
          {error}
          <button onClick={() => window.location.reload()} className="ml-2">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 min-h-screen bg-gray-50">
      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}>
          <div className="bg-white max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-gray-600 hover:text-gray-800 z-10">
              <MdClose className="text-4xl" />
            </button>

            <div className="md:w-2/3 p-2 flex items-center justify-center bg-gray-100 h-[80vh]">
              <img src={selectedPhoto.img}
                alt={selectedPhoto.title}
                className="max-h-[80vh] w-auto object-contain"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>

            <div className="md:w-1/3 p-8 overflow-y-auto min-h-[80vh]">
              <h2 className="text-3xl font-bold mb-6">{selectedPhoto.title}</h2>
              {selectedPhoto.description && (
                <p className="text-gray-600 mb-8 text-lg whitespace-pre-line leading-relaxed">
                  {selectedPhoto.description}
                </p>
              )}
              <div className="space-y-4 text-base">
                <div className="pb-4 border-b border-gray-200">
                  <p className="font-semibold">Photographer:</p>
                  <p className="text-gray-600">
                    {profileData.user?.name || "Unknown Artist"}
                  </p>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <p className="font-semibold">Uploaded:</p>
                  <p className="text-gray-600">
                    {new Date(selectedPhoto.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header Section */}
      <div className="flex flex-col items-center p-8 bg-gray-50 shadow-sm">
        <div className="w-32 h-32 relative mb-6">
          <img src={profileData.user?.avatar || "/default-avatar.jpg"}
            alt={`${profileData.user?.name}'s avatar`}
            className="w-full h-full object-cover rounded-full border-2 border-gray-600 shadow-lg"
          />
        </div>

        <h1 className="text-3xl font-bold font-pt-serif mb-2 text-center text-gray-900 p-2">
          {profileData.user?.name || "Visual Storyteller"}
        </h1>

        <div className="flex flex-wrap gap-3 mb-6 justify-center mt-6">
          {profileData.user.location && (
            <span className="flex bg-primary text-black items-center gap-2 px-4 py-2 rounded-full text-md">
              <MdLocationOn className="text-black" />
              {profileData.user.location}
            </span>
          )}
          {profileData.user.genres && (
            <span className="flex bg-primary items-center gap-2 px-4 py-2 rounded-full text-md text-black">
              <MdBlurOn className="text-purple-500" />
              {profileData.user.genres}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-4 bg-primary p-2 rounded-xl items-center">
            {profileData.user.socialLinks?.instagram && (
              <a href={`https://instagram.com/${profileData.user.socialLinks.instagram}`}
                target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors">
                <FiInstagram className="text-2xl" />
              </a>
            )}
            {profileData.user.socialLinks?.twitter && (
              <a href={`https://twitter.com/${profileData.user.socialLinks.twitter}`}
                target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors">
                <FiTwitter className="text-2xl" />
              </a>
            )}
          {profileData.user.socialLinks?.facebook && (
  <a href={`${profileData.user.socialLinks.facebook}`}
    target="_blank" rel="noopener noreferrer"
    className="text-gray-600 hover:text-blue-600 transition-colors">
    <FiFacebook className="text-2xl" />
  </a>
)}
            {profileData.user.socialLinks?.websites && (
              <a href={profileData.user.socialLinks.websites}
                target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors">
                <MdLink className="text-2xl" />
              </a>
            )}
          </div>

          <div className="relative bg-primary p-2 rounded-xl" ref={dropdownRef}>
            <button onClick={handleShare}
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
              aria-label="Share profile">
              <MdShare className="text-2xl" />
              <span className="text-md">Share</span>
            </button>

            {showShareDropdown && (
              <div className="absolute bottom-0 left-0 mb-8 bg-white  shadow-xl p-2 min-w-[200px] z-50">
                <div className="space-y-2">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 ">
                    <FiFacebook className="text-blue-600" />
                    <span>Facebook</span>
                  </a>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${profileData.user.name || 'this amazing photographer'}'s profile`)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                    <FiTwitter className="text-blue-400" />
                    <span>Twitter</span>
                  </a>
                  <a href={`https://wa.me/?text=${encodeURIComponent(`Check out this photography profile: ${window.location.href}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                    <FaWhatsapp />
                    <span>WhatsApp</span>
                  </a>
                  <button onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setShowShareDropdown(false);
                    }}
                    className="w-full hover:bg-gray-100 flex items-center gap-2 p-2 rounded-md">
                    <MdLink className="text-gray-600" />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      {profileData.user?.about && (
        <div className="bg-gray-50 p-12 shadow-md mt-8 w-full text-center">
          <h3 className="text-xl font-semibold font-pt-serif mb-4 text-gray-900">
            BIOGRAPHY
          </h3>
          <SafeHTML
            html={profileData.user.about}
            className="text-gray-900 max-w-none text-justify"
          />
        </div>
      )}

      {/* Details Section */}
      <div className="flex flex-wrap gap-4 justify-center mt-6 mb-6">
        {profileData.user?.favouriteEquipement && (
          <div className="w-80 bg-gray-600 p-8 shadow-md text-center flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-4 text-white font-marcellus">Gear & Equipment</h3>
            <p className="text-white font-semibold">
              {profileData.user.favouriteEquipement}
            </p>
          </div>
        )}

        {profileData.user?.award && (
          <div className="w-80 bg-gray-600 p-8 shadow-md text-center flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-4 font-marcellus text-white">Achievements</h3>
            <ul className="space-y-2">
              {profileData.user.award.split(",").map((award, index) => (
                <li key={index} className="flex items-center justify-center gap-2 text-white font-semibold">
                  <FaAward className="text-white" />
                  <span>{award.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Gallery Section */}
      <div>
        <h1 className="flex items-center justify-center font-semibold font-marcellus text-3xl m-6 p-6 text-black ">
          Gallerry
        </h1>
     
      <div className="container mx-auto px-4">
  {profileData.photos.length === 0 ? (
    <div className="text-center text-gray-500 text-lg mt-12">
      No photos available. Please check back later.
    </div>
  ) : (
    <div className="columns-1 sm:columns-1 lg:columns-2 xl:columns-2 gap-6 space-y-6">
      {profileData.photos.map((photo) => (
        <div
          key={photo.id}
          className="relative group break-inside-avoid"
          onClick={() => handlePhotoClick(photo)}
        >
          <div
            className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-zoom-in"
            onContextMenu={(e) => e.preventDefault()} // Prevent right-click on image
          >
            <img
              src={photo.img}
              alt={photo.title || "Untitled Photo"}
              className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="text-white">
                <h3 className="text-xl font-bold mb-1">{photo.title || "Untitled Photo"}</h3>
                <p className="text-sm opacity-90">by {photo.author || "Unknown Author"}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
</div>
         </div>
  );
};

export default PublicProfile;