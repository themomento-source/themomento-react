import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { fetchDataFromApi } from "../../utils/api";
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Alert,
  Container,
  Stack,
  Divider,
  alpha,
  Button,
} from "@mui/material";
import { MdPhotoCamera, MdLocationOn, MdBlurOn } from "react-icons/md";
import { BsCartFill } from "react-icons/bs";
import ImageModal from "../../components/ImageModal";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const GlassBox = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: "blur(12px)",
  borderRadius: 16,
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.1)}`,
}));

const ProfileAvatar = styled(motion.img)(({ theme }) => ({
  width: 200,
  height: 200,
  borderRadius: "50%",
  objectFit: "cover",
  border: `4px solid ${alpha(theme.palette.background.paper, 0.3)}`,
  boxShadow: theme.shadows[10],
}));

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
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth="md"
        sx={{ mt: 8, display: "flex", justifyContent: "center" }}
      >
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
          <Button onClick={() => window.location.reload()} sx={{ ml: 2 }}>
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="mt-8 relative m-10">
      {/* Profile Header */}
      <GlassBox className="p-4 mb-6 text-center relative overflow-hidden">
        <ProfileAvatar
          src={profileData.user?.avatar || "/default-avatar.jpg"}
          alt={`${profileData.user?.name}'s avatar`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
        <Typography
          variant="h3"
          className="mt-3 font-extrabold bg-gradient-to-r from-[#fe6b8b] to-[#ff8e53] bg-clip-text text-transparent"
        >
          {`Hello, I am ${profileData.user?.name || "Anonymous Photographer"}`}
        </Typography>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {profileData.user.location && (
            <Chip
              icon={<MdLocationOn />}
              label={profileData.user.location}
              className="bg-blue-100/10 text-blue-600 backdrop-blur-sm"
            />
          )}
          {profileData.user.genres && (
            <Chip
              icon={<MdBlurOn />}
              label={profileData.user.genres}
              className="bg-green-100/10 text-green-600 backdrop-blur-sm"
            />
          )}
          <Chip
            icon={<MdPhotoCamera />}
            label={`${profileData.photos.length} works`}
            className="bg-purple-100/10 text-purple-600 backdrop-blur-sm"
          />
        </div>
      </GlassBox>

      {/* About Section */}
      {profileData.user?.about && (
        <GlassBox className="p-4 mb-6">
          <Typography variant="h5" className="font-bold mb-3">
            About Me
          </Typography>
          <Typography className="text-lg leading-relaxed text-gray-600">
            {profileData.user.about}
          </Typography>
        </GlassBox>
      )}

      {/* Social Links */}
      {(profileData.user.socialLinks?.websites ||
        profileData.user.socialLinks?.instagram ||
        profileData.user.socialLinks?.twitter) && (
        <GlassBox className="p-4 mb-6">
          <Typography variant="h5" className="font-bold mb-3">
            Connect With Me
          </Typography>
          <div className="flex gap-4">
            {profileData.user.socialLinks.websites && (
              <Button
                variant="contained"
                href={profileData.user.socialLinks.websites}
                target="_blank"
                rel="noopener"
              >
                Website
              </Button>
            )}
            {profileData.user.socialLinks.instagram && (
              <Button
                variant="contained"
                color="secondary"
                href={`https://instagram.com/${profileData.user.socialLinks.instagram}`}
                target="_blank"
                rel="noopener"
              >
                Instagram
              </Button>
            )}
            {profileData.user.socialLinks.twitter && (
              <Button
                variant="contained"
                color="info"
                href={`https://twitter.com/${profileData.user.socialLinks.twitter}`}
                target="_blank"
                rel="noopener"
              >
                Twitter
              </Button>
            )}
          </div>
        </GlassBox>
      )}

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {profileData.user?.favouriteEquipement && (
          <div className="h-full">
            <GlassBox className="p-3 h-full">
              <Typography variant="h6" className="font-semibold mb-2">
                🛠 Favorite Gear
              </Typography>
              <Typography className="text-gray-600 whitespace-pre-wrap">
                {profileData.user.favouriteEquipement}
              </Typography>
            </GlassBox>
          </div>
        )}

        {profileData.user?.award && (
          <div className="h-full">
            <GlassBox className="p-3 h-full">
              <Typography variant="h6" className="font-semibold mb-2">
                � Awards & Recognition
              </Typography>
              <div className="space-y-2">
                {profileData.user.award.split(",").map((award, index) => (
                  <div key={index} className="p-3 bg-yellow-100/10 rounded-xl">
                    <Typography variant="body2">
                      {award.trim() || "No awards listed"}
                    </Typography>
                  </div>
                ))}
              </div>
            </GlassBox>
          </div>
        )}
      </div>

      {/* Photo Gallery */}
      <div className="px-0 md:px-4">
        <Typography variant="h4" className="font-extrabold mb-4">
          Portfolio
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {profileData.photos.map((photo) => (
            <motion.div
              key={photo._id}
              onClick={() => handleImageClick(photo)}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={photo.url}
                className="w-full h-full object-cover aspect-square"
                alt={photo.description || "Photography work"}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                {photo.description && (
                  <Typography className="text-white font-medium">
                    {photo.description}
                  </Typography>
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
    </Container>
  );
};

export default PublicProfile;
