import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import ImageModal from "../../components/ImageModal";
import { motion } from "framer-motion";
import { MdLocationOn, MdBlurOn, MdPhotoCamera, MdLink } from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { FiInstagram, FiTwitter } from "react-icons/fi";
import { RiCameraLensFill } from "react-icons/ri";
import SafeHTML from "../../components/SafeHTML";

const PublicProfile = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState({
    user: {},
    photos: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const [userResponse, photosResponse] = await Promise.all([
          fetchDataFromApi(`/api/user/${userId}/public`),
          fetchDataFromApi(`/api/submissions/public/${userId}`),
        ]);

        const photos =
          photosResponse?.data?.flatMap((submission) =>
            submission.image
              ? [
                  {
                    url: submission.image.url,
                    description: submission.description,
                    _id: submission.image.public_id,
                  },
                ]
              : []
          ) || [];

        setProfileData({
          user: userResponse?.data || {},
          photos: photos || [],
        });
      } catch (error) {
        console.error("Error fetching public profile:", error);
        setError(error.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, [userId]);

  const handleImageClick = (photo) => {
    setSelectedImage(photo);
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-4">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" />
      </div>
    );
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
    <div className="container mx-auto py-16 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="relative flex flex-col items-center mb-16 p-10 bg-white  dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="w-48 h-48 relative mb-8">
          <img
            src={profileData.user?.avatar || "/default-avatar.jpg"}
            alt={`${profileData.user?.name}'s avatar`}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <h2 className="text-3xl font-bold mb-4">
          {profileData.user?.name || "Visual Storyteller"}
        </h2>

        <div className="flex flex-wrap gap-3 mb-4">
          {profileData.user.location && (
            <span className="flex items-center gap-2 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-full">
              <MdLocationOn />
              {profileData.user.location}
            </span>
          )}
          {profileData.user.genres && (
            <span className="flex items-center gap-2 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-full">
              <MdBlurOn />
              {profileData.user.genres}
            </span>
          )}
          <span className="flex items-center gap-2 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-full">
            <MdPhotoCamera />
            {`${profileData.photos.length} Works`}
          </span>
        </div>

        <div className="flex gap-3">
          {profileData.user.socialLinks?.instagram && (
            <a
              href={`https://instagram.com/${profileData.user.socialLinks.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-full"
            >
              <FiInstagram className="text-2xl" />
            </a>
          )}
          {profileData.user.socialLinks?.twitter && (
            <a
              href={`https://twitter.com/${profileData.user.socialLinks.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-full"
            >
              <FiTwitter className="text-2xl" />
            </a>
          )}
          {profileData.user.socialLinks?.websites && (
            <a
              href={profileData.user.socialLinks.websites}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-full"
            >
              <MdLink className="text-2xl" />
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {profileData.user?.about && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg">
            <h5 className="text-xl font-semibold mb-3">About</h5>
            <SafeHTML html={profileData.user.about} />
          </div>
        )}

        <div className="space-y-8">
          {profileData.user?.favouriteEquipement && (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg">
              <h5 className="text-xl font-semibold mb-3">Creative Tools</h5>
              <p>{profileData.user.favouriteEquipement}</p>
            </div>
          )}

          {profileData.user?.award && (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg">
              <h5 className="text-xl font-semibold mb-3">Achievements</h5>
              <div className="space-y-3">
                {profileData.user.award.split(",").map((award, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <p>{award.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-3xl font-bold mb-6 text-center">My Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {profileData.photos.map((photo) => (
            <motion.div
              key={photo._id}
              onClick={() => handleImageClick(photo)}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-lg overflow-hidden cursor-pointer bg-gray-200 dark:bg-gray-800"
            >
              <img
                src={photo.url}
                className="w-full object-cover"
                alt={photo.description}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 p-4 flex flex-col justify-end">
                {photo.description && (
                  <p className="text-white">{photo.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageModal
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </div>
  );
};

export default PublicProfile;
