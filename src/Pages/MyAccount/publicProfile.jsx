import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import {
  Typography,
  CircularProgress,
  Chip,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import { MdPhotoCamera, MdLocationOn, MdBlurOn, MdLink } from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { Box } from "@mui/material";
import { FiInstagram, FiTwitter } from "react-icons/fi";
import { RiCameraLensFill } from "react-icons/ri";
import ImageModal from "../../components/ImageModal";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { alpha } from "@mui/material/styles";

const ProfileContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  paddingTop: "64px",
  paddingBottom: "64px",
  minHeight: "100vh",
  backgroundImage: `url('https://res.cloudinary.com/dgob9antb/image/upload/v1739284115/submissions/67aa4612ad68d426b18dda28/approved/mnmzn82tmemtpsohs2c1.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: alpha(theme.palette.background.default, 0.6),
    zIndex: 0,
  },
}));

const ProfileHeader = styled(motion.div)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "64px",
  padding: "40px",
  background: `linear-gradient(45deg, ${alpha(
    theme.palette.background.paper,
    0.15
  )} 0%, ${alpha(theme.palette.background.paper, 0.05)} 100%)`,
  borderRadius: "24px",
  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.37)}`,
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  zIndex: 1,
}));

const GlassCard = styled(motion.div)(({ theme }) => ({
  position: "relative",
  padding: "32px",
  borderRadius: "16px",
  background: `linear-gradient(45deg, ${alpha(
    theme.palette.background.paper,
    0.15
  )} 0%, ${alpha(theme.palette.background.paper, 0.05)} 100%)`,
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  boxShadow: `0 4px 24px ${alpha(theme.palette.common.black, 0.1)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`,
  },
}));

const AvatarWrapper = styled(motion.div)(({ theme }) => ({
  position: "relative",
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  marginBottom: "32px",
  backdropFilter: "blur(8px)",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "50%",
    boxShadow: `0 0 48px ${alpha(theme.palette.primary.main, 0.3)}`,
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  "&:hover::after": {
    opacity: 1,
  },
}));

const ProfileAvatar = styled("img")({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover",
  border: `2px solid ${alpha("#fff", 0.2)}`,
  backdropFilter: "blur(4px)",
});

const SocialLink = styled(IconButton)(({ theme }) => ({
  width: "48px",
  height: "48px",
  background: alpha(theme.palette.background.paper, 0.2),
  backdropFilter: "blur(8px)",
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    background: alpha(theme.palette.background.paper, 0.3),
  },
}));

const GalleryImage = styled(motion.div)(({ theme }) => ({
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  cursor: "pointer",
  background: alpha(theme.palette.background.paper, 0.1),
  backdropFilter: "blur(8px)",
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  "&:hover": {
    "& .image-overlay": {
      opacity: 1,
    },
    transform: "translateY(-4px)",
  },
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
    <ProfileContainer maxWidth="xl">
      <ProfileHeader
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AvatarWrapper whileHover={{ scale: 1.05 }}>
          <ProfileAvatar
            src={profileData.user?.avatar || "/default-avatar.jpg"}
            alt={`${profileData.user?.name}'s avatar`}
          />
        </AvatarWrapper>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "common.black",
            textShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {profileData.user?.name || "Visual Storyteller"}
        </Typography>

        <div className="flex flex-wrap gap-3 mb-4">
          {profileData.user.location && (
            <Chip
              icon={<MdLocationOn />}
              label={profileData.user.location}
              sx={{
                bgcolor: alpha("#000000", 0.1),
                color: "common.black",
                backdropFilter: "blur(8px)",
                "& .MuiChip-icon": { color: "primary.light" },
              }}
            />
          )}
          {profileData.user.genres && (
            <Chip
              icon={<MdBlurOn />}
              label={profileData.user.genres}
              sx={{
                bgcolor: alpha("#000000", 0.1),
                color: "common.black",
                backdropFilter: "blur(8px)",
                "& .MuiChip-icon": { color: "secondary.light" },
              }}
            />
          )}
          <Chip
            icon={<MdPhotoCamera />}
            label={`${profileData.photos.length} Works`}
            sx={{
              bgcolor: alpha("#000000", 0.1),
              color: "common.black",
              backdropFilter: "blur(8px)",
              "& .MuiChip-icon": { color: "success.light" },
            }}
          />
        </div>

        <div className="flex gap-3">
          {profileData.user.socialLinks?.instagram && (
            <SocialLink
              href={`https://instagram.com/${profileData.user.socialLinks.instagram}`}
              target="_blank"
            >
              <FiInstagram style={{ fontSize: "2rem", color: "#000000" }} />
            </SocialLink>
          )}
          {profileData.user.socialLinks?.twitter && (
            <SocialLink
              href={`https://twitter.com/${profileData.user.socialLinks.twitter}`}
              target="_blank"
            >
              <FiTwitter style={{ fontSize: "2rem", color: "#000000" }} />
            </SocialLink>
          )}
          {profileData.user.socialLinks?.websites && (
            <SocialLink
              href={profileData.user.socialLinks.websites}
              target="_blank"
            >
              <MdLink style={{ fontSize: "2rem", color: "#000000" }} />
            </SocialLink>
          )}
        </div>
      </ProfileHeader>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {profileData.user?.about && (
          <GlassCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
                display: "flex",
                gap: 2,
                color: "common.black",
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              <RiCameraLensFill className="text-primary" />
              About
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: alpha("#000000", 0.85),
                lineHeight: 1.7,
                textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {profileData.user.about}
            </Typography>
          </GlassCard>
        )}

        <div className="space-y-8">
          {profileData.user?.favouriteEquipement && (
            <GlassCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  display: "flex",
                  gap: 2,
                  color: "common.black",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                <RiCameraLensFill className="text-secondary" />
                Creative Tools
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: alpha("#000000", 0.85),
                  whiteSpace: "pre-wrap",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                {profileData.user.favouriteEquipement}
              </Typography>
            </GlassCard>
          )}

          {profileData.user?.award && (
            <GlassCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  display: "flex",
                  gap: 2,
                  color: "common.black",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                <FaAward className="text-warning" />
                Achievements
              </Typography>
              <div className="space-y-3">
                {profileData.user.award.split(",").map((award, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl"
                    style={{
                      background: alpha("#000000", 0.1),
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "common.black",
                      }}
                    >
                      {award.trim()}
                    </Typography>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Gallery Section */}
      

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="mb-16"
>
  <Typography
    variant="h3"
    sx={{
      fontWeight: 700,
      mb: 6,
      textAlign: "center",
      color: "common.black",
      textShadow: "0 2px 8px rgba(0,0,0,0.3)",
    }}
  >
    My Gallery
  </Typography>
  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
    {profileData.photos.map((photo) => (
      <GalleryImage
        key={photo._id}
        onClick={() => handleImageClick(photo)}
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={photo.url}
          className="w-full h-[600px] object-cover" // Increased height
          alt={photo.description}
          loading="lazy"
          style={{ border: `1px solid ${alpha("#000000", 0.1)}` }}
        />
        <div className="image-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 p-4 flex flex-col justify-end">
          {photo.description && (
            <Typography
              variant="body1"
              sx={{
                color: "common.black",
                fontWeight: 500,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {photo.description}
            </Typography>
          )}
        </div>
      </GalleryImage>
    ))}
  </div>
</motion.div>


      <ImageModal
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </ProfileContainer>
  );
};

export default PublicProfile;
