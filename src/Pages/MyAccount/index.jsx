import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  TextField,
  Link,
  Grid2,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  MdDashboard,
  MdSettings,
  MdLogout,
  MdPhotoLibrary,
  MdShoppingBag,
  MdCloudUpload,
  MdExpandMore,
} from "react-icons/md";
import { MyContext } from "../../App.jsx";
import { useNavigate } from "react-router-dom";
import { editData, fetchDataFromApi, uploadPhoto } from "../../utils/api.js";
import EventsSection from "../../components/EventSectionHomepage/index.jsx";

function MyAccount() {
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [activeTab, setActiveTab] = useState("submissions");
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

  const { userData, setUserData, openAlertBox, setIsLogin } =
    useContext(MyContext);
  const [submissionData, setSubmissionData] = useState({
    title: "",
    description: "",
    file: "",
  });
  const [photoOfTheDayData, setPhotoOfTheDayData] = useState({
    title: "",
    description: "",
    file: "",
  });
  const [isSubmittingPhotoOfTheDay, setIsSubmittingPhotoOfTheDay] =
    useState(false);
  const navigate = useNavigate();

  const handleAvatarUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
        openAlertBox("error", "Only jpeg/JPG/PNG/WEBP images are allowed");
        return;
      }

      setUploadingAvatar(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await editData("/api/user/user-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.avatar) {
        setUserData((prev) => ({ ...prev, avatar: response.data.avatar }));
        openAlertBox("success", "Avatar updated successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      openAlertBox("error", error.response?.data?.message || "Upload failed");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmissionChange = (e) => {
    setSubmissionData({
      ...submissionData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoOfTheDayChange = (e) => {
    setPhotoOfTheDayData({
      ...photoOfTheDayData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSubmissionData((prev) => ({ ...prev, file })); // Directly set the single file
  };

  const handlePhotoOfTheDayFileSelect = (e) => {
    const file = e.target.files[0];
    setPhotoOfTheDayData((prev) => ({ ...prev, file })); // Directly set the single file
  };

  const handlePhotoSubmission = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", submissionData.title);
      formData.append("description", submissionData.description);
      formData.append("photo", submissionData.file); // Append the single file

      const response = await uploadPhoto("/api/user/submit-photos", formData);

      if (response?.submission) {
        setUserSubmissions((prev) => [response.submission, ...prev]);
        openAlertBox("success", "Photo submitted successfully!");
        setSubmissionData({ title: "", description: "", file: null }); // Reset file
      }
    } catch (error) {
      console.error("Submission error:", error); // Log the full error for debugging
      openAlertBox(
        "error",
        error.response?.data?.message || "Submission failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoOfTheDaySubmission = async (e) => {
    e.preventDefault();
    setIsSubmittingPhotoOfTheDay(true);
    try {
      const formData = new FormData();
      formData.append("title", photoOfTheDayData.title);
      formData.append("description", photoOfTheDayData.description);
      formData.append("image", photoOfTheDayData.file); // Append the single file

      const response = await uploadPhoto("/api/dayphoto/upload", formData);

      if (response?.submission) {
        openAlertBox("success", "Photo submitted for Photo of the Day!");
        setPhotoOfTheDayData({ title: "", description: "", file: null }); // Reset file
      }
    } catch (error) {
      console.error("Photo of the Day submission error:", error);
      openAlertBox(
        "error",
        error.response?.data?.message || "Submission failed"
      );
    } finally {
      setIsSubmittingPhotoOfTheDay(false);
    }
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoadingSubmissions(true);
      try {
        const response = await fetchDataFromApi("/api/user/my-submissions");
        console.log("API Response:", response);

        if (response?.submissions) {
          setUserSubmissions(response.submissions);
        } else {
          console.error("Submissions data not found in response:", response);
          setUserSubmissions([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setUserSubmissions([]);
      } finally {
        setLoadingSubmissions(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLogin(false);
    navigate("/login");
  };

  return (
    <section className="py-8 w-full bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 mb-8 lg:mb-0">
          <Card className="shadow-md border border-gray-200">
            <CardContent className="p-6">
              {/* Profile Section */}
              <div className="text-center mb-8">
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    id="avatarInput"
                    disabled={uploadingAvatar}
                  />
                  <label htmlFor="avatarInput" className="cursor-pointer">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                      {userData?.avatar ? (
                        <img
                          src={userData.avatar}
                          className="w-full h-full object-cover"
                          alt="Profile"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">
                            Add Photo
                          </span>
                        </div>
                      )}
                      {uploadingAvatar && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <CircularProgress size={24} color="inherit" />
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-800 text-center mb-2"
                >
                  {userData?.name || "User Name"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="text-center mb-4"
                >
                  {userData?.email}
                </Typography>
              </div>

              {userData && (
                <Box mt={2} textAlign="center">
                  <Button
                    component={Link}
                    href={`/user/${userData?._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    size="small"
                    className="!text-white"
                  >
                    Your public profile
                  </Button>
                </Box>
              )}
              {/* Navigation */}
              <nav className="space-y-2 py-6">
                <Button
                  fullWidth
                  startIcon={<MdDashboard />}
                  className="!justify-start !text-gray-700 hover:!bg-gray-50 rounded-md py-2"
                >
                  Dashboard
                </Button>
                <Button
                  fullWidth
                  startIcon={<MdPhotoLibrary />}
                  className="!justify-start !text-gray-600 hover:!bg-gray-50"
                  onClick={() => setActiveTab("submissions")}
                >
                  My Submissions
                </Button>
                <Button
                  fullWidth
                  startIcon={<MdShoppingBag />}
                  className="!justify-start !text-gray-600 hover:!bg-gray-50"
                  onClick={() => setActiveTab("purchases")}
                >
                  Purchases
                </Button>
                <Button
                  component={Link}
                  href="/my-account/settings"
                  fullWidth
                  startIcon={<MdSettings />}
                  className="!capitalize !justify-start !text-gray-600 hover:!bg-gray-50"
                >
                  Edit Profile
                </Button>
                <Button
                  fullWidth
                  startIcon={<MdLogout />}
                  className="!justify-start !text-red-500 hover:!bg-red-50"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Content Tabs */}
          <Card className="shadow-sm border border-gray-200">
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
            >
              <Tab label="Photo Submissions" value="submissions" />
              <Tab label="Purchased Photos" value="purchases" />
            </Tabs>

            <CardContent className="p-6">
              {activeTab === "submissions" && (
                <div>
                  <Grid2 container spacing={4} className="mt-8">
                    {/* Submit Photo for Sale */}
                    <Grid2 item xs={12}>
                      <Typography variant="h6" className="mb-4">
                        Submit Photo for Sale
                      </Typography>
                      <form onSubmit={handlePhotoSubmission}>
                        <TextField
                          fullWidth
                          label="Submission Title"
                          name="title"
                          value={submissionData.title}
                          onChange={handleSubmissionChange}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <TextField
                          fullWidth
                          label="Description"
                          name="description"
                          multiline
                          rows={3}
                          value={submissionData.description}
                          onChange={handleSubmissionChange}
                          variant="outlined"
                          margin="normal"
                          required
                        />
                        <div className="flex items-center gap-4 mt-4">
                          <input
                            type="file"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="photoSubmission"
                            accept="image/*"
                            required
                          />
                          <label htmlFor="photoSubmission">
                            <Button
                              variant="outlined"
                              startIcon={<MdCloudUpload />}
                              component="span"
                            >
                              Select Photo
                            </Button>
                          </label>
                          <Button
                            type="submit"
                            variant="contained"
                            startIcon={<MdCloudUpload />}
                            disabled={
                              isSubmitting ||
                              !submissionData.title ||
                              !submissionData.description ||
                              !submissionData.file
                            }
                          >
                            {isSubmitting ? (
                              <CircularProgress size={24} />
                            ) : (
                              "Submit"
                            )}
                          </Button>
                        </div>
                        {submissionData.file && (
                          <div className="mt-2">
                            <Typography variant="body2" color="text.secondary">
                              Selected file: {submissionData.file.name}
                            </Typography>
                          </div>
                        )}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="mt-2"
                        >
                          Only 1 photo per submission
                        </Typography>
                      </form>
                    </Grid2>

                    {/* Submit Photo for Photo of the Day */}
                    <Grid2 item xs={12}>
  <Typography variant="h6" className="mb-4">
    Submit Photo for Photo of the Day
  </Typography>
  <Accordion className="mb-4">
    <AccordionSummary
      expandIcon={<MdExpandMore />}
      aria-controls="photo-of-the-day-rules"
      id="photo-of-the-day-rules-header"
      sx={{
        backgroundColor: "#FFCB00", // Yellow background
        color: "#000", // Black text
        "&:hover": {
          backgroundColor: "#e6b800", // Darker yellow on hover
        },
      }}
    >
      <Typography variant="subtitle1">
        How It Works & Submission Rules
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography variant="body2" className="mb-4">
        Today's Best Click is where creativity takes center stage! Every day, we
        spotlight one extraordinary photo that captures a moment, a feeling, or a
        story that stands out. From breathtaking landscapes to intimate
        snapshots, each featured photo is a testament to the power of daily
        practice and the beauty found in the world around us. We believe that
        every click has the potential to inspire. So, whether you're a seasoned
        pro or just starting out, share your shots with us—your next photo might
        be the one that becomes Today's Best Click!
      </Typography>
      <Typography variant="body2" className="mb-4">
        <strong>Submit Your Today’s Best Click:</strong> How It Works
      </Typography>
      <ol className="list-decimal pl-6">
        <li>
          <strong>One Photo Per Day:</strong> You can submit up to three photos
          per day, with each photo taken within the current week (Monday to
          Sunday). The photo must be an original, captured during the week you
          submit it, showcasing your unique perspective and creative vision.
        </li>
        <li>
          <strong>High-Quality Image:</strong> Your photo should have a minimum
          resolution of 2500px on the longest side. We recommend submitting in
          JPEG or PNG format.
        </li>
        <li>
          <strong>No Watermarks, Logos, or Frames:</strong> To keep the focus on
          your photography, please avoid adding watermarks, logos, or frames to
          your image. Your photo should be as natural as possible, ready for
          display.
        </li>
        <li>
          <strong>Keep Edits Simple:</strong> We encourage you to capture your
          photos in-camera without relying heavily on post-editing. Extreme
          edits, heavy filters, or drastic alterations will not be accepted. You
          can make basic edits (such as adjusting brightness, contrast, or
          cropping) to enhance your photo, but try to keep the image true to what
          you captured.
        </li>
        <li>
          <strong>Tell Your Story:</strong> When submitting your photo, include a
          brief description. Why did you take the photo? When and where did you
          capture the moment? How did you take the shot? This helps our reviewers
          select the best submissions and allows your story to shine through.
        </li>
        <li>
          <strong>Respectful Content:</strong> We strive to maintain a positive,
          inclusive space. Please ensure your photo is respectful and appropriate
          for all audiences.
        </li>
        <li>
          <strong>Feature on Our Social Media:</strong> By submitting your photo
          weekly, you could be featured as Today's Best Click on our website and
          social media channels! We review all submissions and select the
          standout shots to showcase.
        </li>
        <li>
          <strong>Create Your Own Gallery:</strong> With each photo you submit,
          you’ll build your personal gallery on our website. Over time, you’ll be
          able to look back and see how your skills have evolved through daily
          practice.
        </li>
        <li>
          <strong>Engage with the Community:</strong> Feel free to comment, like,
          and interact with other photographers. Sharing experiences, providing
          feedback, and engaging with the community is an inspiring part of this
          journey.
        </li>
        <li>
          <strong>Use #momento_bestclick:</strong> Want to increase your chances
          of being noticed? Use the hashtag #momento_bestclick on social media
          and tag us to get featured on our platforms!
        </li>
      </ol>
      <Typography variant="body2" className="mt-4">
        By practicing daily and submitting your photos, you’ll not only improve
        your craft but also be part of a creative and supportive community.
        Capture your moments authentically, submit your photos, and see how your
        skills grow!
      </Typography>
    </AccordionDetails>
  </Accordion>
  <form onSubmit={handlePhotoOfTheDaySubmission}>
    <TextField
      fullWidth
      label="Photo Title"
      name="title"
      value={photoOfTheDayData.title}
      onChange={handlePhotoOfTheDayChange}
      variant="outlined"
      margin="normal"
      required
    />
    <TextField
      fullWidth
      label="Description"
      name="description"
      multiline
      rows={3}
      value={photoOfTheDayData.description}
      onChange={handlePhotoOfTheDayChange}
      variant="outlined"
      margin="normal"
      required
    />
    <div className="flex items-center gap-4 mt-4">
      <input
        type="file"
        onChange={handlePhotoOfTheDayFileSelect}
        className="hidden"
        id="photoOfTheDaySubmission"
        accept="image/*"
        required
      />
      <label htmlFor="photoOfTheDaySubmission">
        <Button
          variant="outlined"
          startIcon={<MdCloudUpload />}
          component="span"
        >
          Select Photo
        </Button>
      </label>
      <Button
        type="submit"
        variant="contained"
        startIcon={<MdCloudUpload />}
        disabled={
          isSubmittingPhotoOfTheDay ||
          !photoOfTheDayData.title ||
          !photoOfTheDayData.description ||
          !photoOfTheDayData.file
        }
      >
        {isSubmittingPhotoOfTheDay ? (
          <CircularProgress size={24} />
        ) : (
          "Submit"
        )}
      </Button>
    </div>
    {photoOfTheDayData.file && (
      <div className="mt-2">
        <Typography variant="body2" color="text.secondary">
          Selected file: {photoOfTheDayData.file.name}
        </Typography>
      </div>
    )}
    <Typography
      variant="body2"
      color="text.secondary"
      className="mt-2"
    >
      Only 1 photo per submission
    </Typography>
  </form>
</Grid2>

                    {/* Display Submissions */}
                    <Grid2 item xs={12}>
                      {loadingSubmissions ? (
                        <div className="text-center">
                          <CircularProgress />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="mt-2"
                          >
                            Loading submissions...
                          </Typography>
                        </div>
                      ) : userSubmissions?.length > 0 ? (
                        <Grid2 container spacing={4}>
                          {userSubmissions.map((submission) => (
                            <Grid2
                              item
                              xs={12}
                              sm={6}
                              md={4}
                              key={submission._id}
                            >
                              <Card className="shadow-sm border border-gray-200 h-full flex flex-col">
                                <CardContent>
                                  <Typography
                                    variant="h6"
                                    className="font-semibold mb-2 py-2"
                                  >
                                    {submission.title || "Untitled Submission"}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    className="mb-2 text-gray-600 py-2"
                                  >
                                    {submission.description || "No description"}
                                  </Typography>

                                  <div className="grid grid-cols-1">
                                    <div className="relative aspect-square py-4">
                                      <img
                                        src={submission.image.url}
                                        alt="Submission"
                                        className="w-full h-full object-cover"
                                      />
                                      {submission.status === "rejected" && (
                                        <Chip
                                          label="Rejected"
                                          color="error"
                                          size="small"
                                          className="!absolute top-1 right-1"
                                        />
                                      )}
                                    </div>
                                  </div>

                                  {submission.rejectionReason && (
                                    <Typography
                                      variant="body2"
                                      className="mt-2 text-red-600"
                                    >
                                      <strong>Reason:</strong>{" "}
                                      {submission.rejectionReason}
                                    </Typography>
                                  )}

                                  <div className="mt-3 flex justify-between items-center">
                                    <Chip
                                      label={submission.status || "pending"}
                                      color={
                                        submission.status === "approved"
                                          ? "success"
                                          : submission.status === "rejected"
                                          ? "error"
                                          : "default"
                                      }
                                      size="small"
                                    />
                                    <Typography
                                      variant="caption"
                                      className="text-gray-500"
                                    >
                                      {new Date(
                                        submission.createdAt
                                      ).toLocaleDateString()}
                                    </Typography>
                                  </div>
                                </CardContent>
                              </Card>
                            </Grid2>
                          ))}
                        </Grid2>
                      ) : (
                        <div className="text-center p-8">
                          <Typography variant="h6" color="text.secondary">
                            No submissions found
                          </Typography>
                        </div>
                      )}
                    </Grid2>
                  </Grid2>
                </div>
              )}

              {activeTab === "purchases" && (
                <div className="p-6">
                  <Typography variant="h6" className="mb-4">
                    Your purchased photos will appear here
                  </Typography>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </section>
  );
}

export default MyAccount;