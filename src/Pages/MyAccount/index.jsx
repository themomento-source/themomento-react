import React, { useState, useContext, useEffect, useRef } from "react";
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
  Grid,
  
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  MdDashboard,
  MdSettings,
  MdLogout,
  MdPhotoLibrary,
  MdShoppingBag,
  MdCloudUpload,
  
} from "react-icons/md";
import { MyContext } from "../../App.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { editData, fetchDataFromApi, uploadPhoto } from "../../utils/api.js";

function MyAccount() {
  const { userId } = useParams();
  
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [activeTab, setActiveTab] = useState("submissions");
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [categories, setCategories] = useState([]);
  const [submissionData, setSubmissionData] = useState({
    title: "",
    description: "",
    categoryId: "",
    size: "",
    resolution: "",
    file: null,
    preview: "",
  });
  const [photoOfTheDayData, setPhotoOfTheDayData] = useState({
    title: "",
    description: "",
    file: null,
    preview: "",
  });
  const [isSubmittingPhotoOfTheDay, setIsSubmittingPhotoOfTheDay] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { userData, setUserData, openAlertBox, setIsLogin } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userId !== userData._id) {
      navigate(`/my-account/${userData._id}`);
    }
  }, [userId, userData, navigate]);

  // Add a ref for the photoSubmission file input
  const photoSubmissionRef = useRef(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoadingSubmissions(true);
      try {
        const response = await fetchDataFromApi("/api/user/my-submissions");
        if (response?.submissions) {
          setUserSubmissions(response.submissions);
        } else {
          setUserSubmissions([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setUserSubmissions([]);
      } finally {
        setLoadingSubmissions(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetchDataFromApi("/api/category");
        if (response?.categories) {
          setCategories(response.categories);
        }
      } catch (error) {
        console.error("Fetch categories error:", error);
      }
    };

    fetchSubmissions();
    fetchCategories();
  }, []);

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
        // Update user data and force re-render
        setUserData(prev => ({ 
          ...prev, 
          avatar: `${response.data.avatar}?ts=${Date.now()}`
        }));
        setSnackbar({
          open: true,
          message: "Avatar uploaded successfully!",
          severity: "success",
        });
        setUploadingAvatar((prev) => !prev);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Upload failed",
        severity: "error",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmissionChange = (e) => {
    if (e.target.name === "description" && e.target.value.length > 400) {
      return;
    }
    setSubmissionData({
      ...submissionData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoOfTheDayChange = (e) => {
    if (e.target.name === "description" && e.target.value.length > 400) {
      return;
    }
    setPhotoOfTheDayData({
      ...photoOfTheDayData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setSubmissionData((prev) => ({ ...prev, file, preview }));
    }
  };

  const handlePhotoOfTheDayFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPhotoOfTheDayData((prev) => ({ ...prev, file, preview }));
    }
  };

  const handlePhotoSubmission = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", submissionData.title);
      formData.append("description", submissionData.description);
      formData.append("categoryId", submissionData.categoryId);
      formData.append("size", submissionData.size);
      formData.append("resolution", submissionData.resolution);
      formData.append("photo", submissionData.file);

      const response = await uploadPhoto("/api/user/submit-photos", formData);

      if (response?.submission) {
        setUserSubmissions((prev) => [response.submission, ...prev]);
        setSnackbar({
          open: true,
          message: "Photo submitted successfully!",
          severity: "success",
        });
        setSubmissionData({
          title: "",
          description: "",
          categoryId: "",
          size: "",
          resolution: "",
          file: null,
          preview: "",
        });

        // Clear file input using ref
        if (photoSubmissionRef.current) {
          photoSubmissionRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Submission failed",
        severity: "error",
      });
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
      formData.append("image", photoOfTheDayData.file);

      const response = await uploadPhoto("/api/dayphoto/upload", formData);

      if (response?.submission) {
        setSnackbar({
          open: true,
          message: "Photo submitted for Photo of the Day!",
          severity: "success",
        });
        setPhotoOfTheDayData({ title: "", description: "", file: null, preview: "" });
        // Clear file input
        document.getElementById("photoOfTheDaySubmission").value = "";
      }
    } catch (error) {
      console.error("Photo of the Day submission error:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Submission failed",
        severity: "error",
      });
    } finally {
      setIsSubmittingPhotoOfTheDay(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLogin(false);
    navigate("/login");
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
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
                       src={`${userData.avatar}?ts=${new Date().getTime()}`} // Add timestamp query parameter
                       className="w-full h-full object-cover"
                       alt="Profile"
                     />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">Add Photo</span>
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
                <Typography variant="h6" className="font-semibold text-gray-800 text-center mb-2">
                  {userData?.name || "User Name"}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="text-center mb-4">
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
  className="!bg-amber-400 !text-gray-900 !capitalize px-4 transition-colors duration-200"
>
  Switch to Your Public Profile
</Button>
                </Box>
              )}

              {/* Navigation */}
              <nav className="space-y-2 py-6">
                
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
                  href={`/my-account/${userData?._id}/settings`}
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
          <Card className="shadow-sm border border-gray-200">
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Photo Submissions" value="submissions" />
              <Tab label="Purchased Photos" value="purchases" />
            </Tabs>


            <CardContent className="p-6">
              {activeTab === "submissions" && (
                <div>
                  <Grid container spacing={4} className="mt-8">
                    {/* Submit Photo for Sale */}
                    <Grid item xs={12}>
                      <Typography variant="h6" className="mb-4">
                        Submit Photo for your portfolio
                      </Typography>
                      <form onSubmit={handlePhotoSubmission}>
                        <TextField
                          fullWidth
                          label="Title"
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
                          inputProps={{ maxLength: 400 }}
                          helperText={`${submissionData.description.length}/400`}
                        />
                        <FormControl fullWidth margin="normal" required>
                          <InputLabel>Category</InputLabel>
                          <Select
                            name="categoryId"
                            value={submissionData.categoryId}
                            onChange={handleSubmissionChange}
                            label="Category"
                          >
                            {categories.map((category) => (
                              <MenuItem key={category._id} value={category._id}>
                                {category.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          fullWidth
                          label="Size"
                          name="size"
                          value={submissionData.size}
                          onChange={handleSubmissionChange}
                          variant="outlined"
                          margin="normal"
                        />
                        <TextField
                          fullWidth
                          label="Resolution"
                          name="resolution"
                          value={submissionData.resolution}
                          onChange={handleSubmissionChange}
                          variant="outlined"
                          margin="normal"
                        />
                        <div className="flex items-center gap-4 mt-4">
                          <input
                            type="file"
                            onChange={handleFileSelect}
                            className="hidden-file-input" // Use the new CSS class
                            id="photoSubmission"
                            accept="image/*"
                            required
                            ref={photoSubmissionRef}
                          />
                          <label htmlFor="photoSubmission">
                          <Button
  variant="outlined"
  startIcon={<MdCloudUpload className="text-lg" />}
  component="span"
  className="!border-2 !border-gradient-to-r !from-blue-500 !to-purple-500 hover:!from-blue-600 hover:!to-purple-600 !text-gray-800 hover:!text-white !rounded-xl !px-6 !py-3 !transition-all !duration-300 hover:!bg-gradient-to-r hover:!from-blue-500 hover:!to-purple-500 !font-semibold !tracking-wide hover:!shadow-lg active:!scale-95"
>
  Upload File
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
                              !submissionData.categoryId ||
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
                            <img
                              src={submissionData.preview}
                              alt="Preview"
                              className="mt-2 w-32 h-32 object-cover"
                            />
                          </div>
                        )}
                      </form>
                    </Grid>

                    {/* Submit Photo for Photo of the Day */}
                    <Grid item xs={12}>
                      <Typography variant="h6" className="mb-4">
                        Submit Photo for Photo of the Day
                      </Typography>
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
                          inputProps={{ maxLength: 400 }}
                          helperText={`${photoOfTheDayData.description.length}/400`}
                        />
                        <div className="flex items-center gap-4 mt-4">
                          <input
                            type="file"
                            onChange={handlePhotoOfTheDayFileSelect}
                            className="hidden-file-input" // Use the new CSS class
                            id="photoOfTheDaySubmission"
                            accept="image/*"
                            required
                          />
                          <label htmlFor="photoOfTheDaySubmission">
                          <Button
  variant="outlined"
  startIcon={<MdCloudUpload className="text-lg" />}
  component="span"
  className="!border-2 !border-gradient-to-r !from-blue-500 !to-purple-500 hover:!from-blue-600 hover:!to-purple-600 !text-gray-800 hover:!text-white !rounded-xl !px-6 !py-3 !transition-all !duration-300 hover:!bg-gradient-to-r hover:!from-blue-500 hover:!to-purple-500 !font-semibold !tracking-wide hover:!shadow-lg active:!scale-95"
>
  Upload File
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
                            <img
                              src={photoOfTheDayData.preview}
                              alt="Preview"
                              className="mt-2 w-32 h-32 object-cover"
                            />
                          </div>
                        )}
                        <Typography variant="body2" color="text.secondary" className="mt-2">
                          Only 1 photo per submission
                        </Typography>
                      </form>
                    </Grid>

                    {/* Display Submissions */}
                    <Grid item xs={12}>
                      {loadingSubmissions ? (
                        <div className="text-center">
                          <CircularProgress />
                          <Typography variant="body2" color="text.secondary" className="mt-2">
                            Loading submissions...
                          </Typography>
                        </div>
                      ) : userSubmissions?.length > 0 ? (
                        <Grid container spacing={4}>
                        {userSubmissions.map((submission) => (
                          <Grid item xs={12} sm={6} md={4} key={submission._id}>
                            <Card className="shadow-sm border border-gray-200 h-full flex flex-col">
                              <CardContent>
                                <Typography variant="h6" className="font-semibold mb-2 py-2">
                                  {submission.title || "Untitled Submission"}
                                </Typography>
                                <Typography variant="body2" className="mb-2 text-gray-600 py-2">
                                  {submission.description || "No description"}
                                </Typography>
                                <div className="relative aspect-square py-4">
                                  <img
                                    src={
                                      submission.status === "approved"
                                        ? submission.image.url // Approved image URL
                                        : submission.image.url // Fallback pending/rejected URL
                                    }
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
                                {submission.rejectionReason && (
                                  <Typography variant="body2" className="mt-2 text-red-600">
                                    <strong>Reason:</strong> {submission.rejectionReason}
                                  </Typography>
                                )}
                                <div className="mt-3 flex justify-between items-center">
                                  <Chip
                                    label={submission.status || "pending"}
                                    color={
                                      {
                                        approved: "success",
                                        rejected: "error",
                                        pending: "default",
                                      }[submission.status] || "default"
                                    }
                                    size="small"
                                  />
                                  <Typography variant="caption" className="text-gray-500">
                                    {new Date(submission.createdAt).toLocaleDateString()}
                                  </Typography>
                                </div>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                      ) : (
                        <div className="text-center p-8">
                          <Typography variant="h6" color="text.secondary">
                            No submissions found
                          </Typography>
                        </div>
                      )}
                    </Grid>
                  </Grid>
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </section>
  );
}

export default MyAccount;