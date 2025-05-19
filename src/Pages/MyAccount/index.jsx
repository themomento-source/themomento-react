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
  TextField,
  MenuItem,
  Grid,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { MdPhotoLibrary, MdOutlineFileUpload, MdSettings, MdLogout } from "react-icons/md";

import { formatDistanceToNow } from "date-fns";
import { CgProfile } from "react-icons/cg";
import { Modal, IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { MyContext } from "../../App.jsx";
import { useNavigate, useParams, Link } from "react-router-dom";
import { editData, fetchDataFromApi, uploadPhoto, deleteData } from "../../utils/api.js";

function MyAccount() {
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); 
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { userId } = useParams();
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [activeTab, setActiveTab] = useState("submissions");
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [categories, setCategories] = useState([]);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [submissionData, setSubmissionData] = useState({
    title: "",
    description: "",
    categories: [],
    size: "",
    resolution: "",
    file: null,
    preview: "",
  });

  const MAX_FILE_SIZE_MB = 5;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; 

  const { userData, setUserData, openAlertBox, setIsLogin } = useContext(MyContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userData && userId !== userData._id) {
      navigate(`/my-account/${userData._id}`);
    }
  }, [userId, userData, navigate]);

  const fetchSubmissions = async () => {
    try {
      setLoadingSubmissions(true);
      const response = await fetchDataFromApi(
        `/api/photo/user-submissions/${userData?._id}`
      );
      if (response?.success) {
        setUserSubmissions(response.submissions);
      }
    } catch (error) {
      openAlertBox("error", "Failed to load submissions");
      console.error("Error fetching submissions:", error);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const fetchUnreadMessages = async () => {
    try {
      const response = await fetchDataFromApi("/api/message/unread-count");
      if (response?.success) {
        setUnreadCount(response.data);
      }
    } catch (error) {
      console.error("Error fetching unread messages count:", error);
    }
  };

  useEffect(() => {
    fetchUnreadMessages();

   
    const interval = setInterval(() => {
      fetchUnreadMessages();
    }, 30000); 

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        const response = await fetchDataFromApi("/api/message");
        if (response?.success) {
          setMessages(response.data);
          fetchUnreadMessages(); 
        }
      } catch (error) {
        openAlertBox("error", "Failed to load messages");
      } finally {
        setLoadingMessages(false);
      }
    };

    if (activeTab === "messages") {
      fetchMessages();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchSubmissions();
      try {
        const categoriesResponse = await fetchDataFromApi("/api/category");
        setCategories(categoriesResponse?.categories || []);
      } catch (error) {
        openAlertBox("error", "Failed to load categories");
        console.error("Error fetching categories:", error);
      }
    };

    if (userData?._id) fetchData();
  }, [userData]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      openAlertBox("error", "Avatar size exceeds 1MB limit");
      return;
    }
  

    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      openAlertBox("error", "Only JPEG, JPG, PNG, and WEBP images are allowed.");
      return;
    }

    try {
      setUploadingAvatar(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await editData("/api/user/user-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.avatar) {
        setUserData((prev) => ({
          ...prev,
          avatar: `${response.data.avatar}?ts=${Date.now()}`,
        }));
        openAlertBox("success", "Avatar uploaded successfully!");
      }
    } catch (error) {
      console.error("Avatar upload failed:", error);
      openAlertBox("error", error.message || "Avatar upload failed.");
    } finally {
      setUploadingAvatar(false);
    }
  };


  const handleEditPhoto = (submission) => {
    setEditingPhoto(submission);
    setSubmissionData({
      title: submission.title,
      description: submission.description,
      categories: submission.categories.map(cat => cat._id),
      file: null,
      preview: submission.images[0]?.url || "",
    });
  };

  const handleSubmissionChange = (e) => {
    const { name, value } = e.target;
    setSubmissionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setSubmissionData((prev) => ({ ...prev, file, preview }));
    }
  };




const handlePhotoSubmission = async (e) => {
  e.preventDefault();
  try {
    setIsSubmitting(true);
    
    // Client-side validation
    if (submissionData.file) {
      if (submissionData.file.size > MAX_FILE_SIZE_BYTES) {
        throw new Error(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit`);
      }
      
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(submissionData.file.type)) {
        throw new Error('Only JPG, PNG, and GIF files are allowed');
      }
    }

    const formData = new FormData();
    
    if (submissionData.file) {
      formData.append("photo", submissionData.file);
    }
    
    formData.append("title", submissionData.title.trim());
    formData.append("description", submissionData.description.trim());
    formData.append("categories", JSON.stringify(submissionData.categories));

    // Simple title validation
    if (!submissionData.title.trim()) {
      throw new Error('Title is required');
    }

    let response;
    if (editingPhoto) {
      response = await editData(
        `/api/photo/update/${editingPhoto._id}`,
        formData
      );
    } else {
      response = await uploadPhoto("/api/photo/submit", formData);
    }

    if (response?.success) {
      openAlertBox("success", editingPhoto ? "Photo updated!" : "Photo submitted!");
      setEditingPhoto(null);
      await fetchSubmissions();
      setSubmissionData({
        title: "",
        description: "",
        categories: [],
        file: null,
        preview: "",
      });
    }
  } catch (error) {
    console.error("Submission error:", error);
    
    let errorMessage = "Submission failed. Please try again.";
    
    // Handle specific error cases
    if (error.message.includes('File size exceeds')) {
      errorMessage = error.message;
    } else if (error.response?.status === 413) {
      errorMessage = `File size exceeds server limit (max ${MAX_FILE_SIZE_MB}MB)`;
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    openAlertBox("error", errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};


  const handleDeletePhoto = async (photoId) => {
    if (window.confirm("Are you sure you want to permanently delete this photo?")) {
      try {
        const response = await deleteData(
          `/api/photo/user/${photoId}`,
          
        );
        
        if (response?.success) {
          openAlertBox('success', 'Photo deleted successfully');
          await fetchSubmissions(); // Refresh the list
        }
      } catch (error) {
        openAlertBox('error', error.message || 'Failed to delete photo');
      }
    }
  };

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
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 relative">
                    {uploadingAvatar && (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <CircularProgress size={24} color="inherit" />
        <span className="text-white text-xs mt-2">Uploading</span>
      </div>
    )}
                      {userData?.avatar ? (
                        <img
                          src={`${userData.avatar}?ts=${new Date().getTime()}`}
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
                <Typography variant="h6" className="!font-semibold text-gray-800 text-center mb-2 !font-marcellus">
                  {userData?.name || "User Name"}
                </Typography>

                <p className="font-pt-serif">
                 Unique Id:  {userData?.uniqueId}
                </p>
              </div>


              

              {/* Navigation */}
              <nav className="space-y-2">
                <Button
                  component={Link}
                  to={`/user/${userData?._id}`}
                  fullWidth
                  startIcon={<CgProfile />}
                  className="!bg-primary !justify-start !rounded-none !text-gray-800 !capitalize"
                >
                  View Public Profile
                </Button>
               
                <Button
                  component={Link}
                  to={`/my-account/${userData?._id}/settings`}
                  fullWidth
                  startIcon={<MdSettings />}
                  className="!bg-primary !justify-start !rounded-none !text-gray-800 !capitalize"
                >
                  Edit Profile
                </Button>
                <Button
                  fullWidth
                  startIcon={<MdLogout />}
                  className="!bg-primary !justify-start !rounded-none !text-gray-800"
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
              <Tab label={`Photo Submissions`} value="submissions" />
             
              <Tab label={`Messages (${unreadCount})`} value="messages" /> {/* Unread Message Count */}
            </Tabs>

            {/* Messages */}
            {activeTab === "messages" && (
              <div className="mt-4">
                {loadingMessages ? (
                  <div className="text-center">
                    <CircularProgress />
                    <Typography variant="body2" color="text.secondary" className="mt-2">
                      Loading messages...
                    </Typography>
                  </div>
                ) : messages.length > 0 ? (
                  <Grid container spacing={3}>
                    {messages.map((message) => (
                      <Grid item xs={12} key={message._id}>
                       <Card 
      className="shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => setSelectedMessage(message)}
    >
                          <CardContent>
                            <div className="flex items-start justify-between">
                              <div>
                                <Typography variant="h6" className="font-semibold">
                                  {message.subject}
                                </Typography>
                                <Typography variant="body2" className="text-gray-600 mt-1">
                                  {message.content}
                                </Typography>
                                <div className="flex items-center mt-2 gap-2">
                                
                                  <Typography variant="caption" className="text-gray-500">
                                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <div className="text-center p-8">
                    <Typography variant="h6" color="text.secondary">
                      No messages found
                    </Typography>
                  </div>
                )}
              </div>
            )}

            {/* Submissions */}
            {activeTab === "submissions" && (
              <CardContent className="p-6">
                <Grid container spacing={4} className="mt-8">
                  <Grid item xs={12}>
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
                        <InputLabel>Categories</InputLabel>
                        <Select
                          multiple
                          name="categories"
                          value={submissionData.categories}
                          onChange={handleSubmissionChange}
                          renderValue={(selected) =>
                            selected.map((id) => categories.find((c) => c._id === id)?.name).join(", ")
                          }
                        >
                          {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <div className="flex items-center gap-4 mt-4">
                      <Button
    variant="outlined"
    onClick={() => setShowGuidelines(true)}
    className="!border-gray-800 !text-gray-800 !rounded-none !font-pt-serif"
  >
    Read Before Submit
  </Button>
                        <input
                          type="file"
                          onChange={handleFileSelect}
                          className="hidden-file-input"
                          id="photoSubmission"
                          accept="image/*"
                          required
                          ref={fileInputRef}
                        />
                        <label htmlFor="photoSubmission">
                          <Button
                            startIcon={<MdOutlineFileUpload className="text-lg" />}
                            component="span"
                            className="!bg-primary !font-pt-serif !text-gray-800 !rounded-none !capitalize"
                          >
                            Upload File
                          </Button>
                        </label>
                        <Button
                          type="submit"
                          variant="contained"
                          className="!rounded-none !font-pt-serif"
                          startIcon={<FiSend />}
                          disabled={isSubmitting || !submissionData.file}
                        >
                          {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
                        </Button>
                        <p className="file-size-note">
  Maximum file size: {MAX_FILE_SIZE_MB}MB
</p>
                      </div>
                      {submissionData.file && (
                        <div className="mt-4">
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
                                <Typography variant="h6" className="font-semibold mb-2 py-2 font-marcellus">
                                  {submission.title || "Untitled Submission"}
                                </Typography>
                                <Typography variant="body2" className="mb-2 text-gray-900 font-marcellus py-2">
                                  {submission.description || "No description"}
                                </Typography>
                                <div className="relative aspect-square py-4">
  <img
    src={submission.images?.[0]?.url}
    alt="Submission"
    className="w-full h-full object-cover"
  />
</div>

                               
  <div className="mt-3 flex justify-between items-center">
  <Chip
    label={submission.status || "pending"}
    color={{
      approved: "success",
      pending: "warning",
    }[submission.status] || "default"}
    size="small"
  />
  <div className="flex items-center gap-2">
    <Typography variant="caption" className="text-gray-500">
      {new Date(submission.createdAt).toLocaleDateString()}
    </Typography>

    <Button
  variant="outlined"
  size="small"
  onClick={() => handleEditPhoto(submission)}
>
  Edit
</Button>

    <Button
      variant="outlined"
      color="error"
      size="small"
      onClick={() => handleDeletePhoto(submission._id)}
     
    >
      Delete
    </Button>
  </div>
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
              </CardContent>
            )}
          </Card>
        </main>
      </div>

      <Modal open={Boolean(editingPhoto)} onClose={() => setEditingPhoto(null)}>
  <div className="bg-white p-6 max-w-2xl w-full rounded-lg">
    <h2 className="text-2xl mb-4">Edit Photo</h2>

   
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
                        <InputLabel>Categories</InputLabel>
                        <Select
                          multiple
                          name="categories"
                          value={submissionData.categories}
                          onChange={handleSubmissionChange}
                          renderValue={(selected) =>
                            selected.map((id) => categories.find((c) => c._id === id)?.name).join(", ")
                          }
                        >
                          {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <div className="flex items-center gap-4 mt-4">
                      {/* <Button
    variant="outlined"
    onClick={() => setShowGuidelines(true)}
    className="!border-gray-800 !text-gray-800 !rounded-none"
  >
    Read Before Submit
  </Button> */}
  <input
  type="file"
  onChange={handleFileSelect}
  className="hidden-file-input"
  id="photoSubmission"
  accept="image/*"
  required={!editingPhoto} 
  ref={fileInputRef}
/>
                        <label htmlFor="photoSubmission">
                          {/* <Button
                            startIcon={<MdOutlineFileUpload className="text-lg" />}
                            component="span"
                            className="!bg-primary !text-gray-800 !rounded-none !capitalize"
                          >
                            Upload File
                          </Button> */}
                        </label>
                        <Button
  type="submit"
  variant="contained"
  className="!rounded-none"
  startIcon={<FiSend />}
  disabled={isSubmitting || (!editingPhoto && !submissionData.file)}
>
  {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
</Button>
                      </div>
                      {submissionData.file && (
                        <div className="mt-4">
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
      <Button type="submit">
        {isSubmitting ? "Updating..." : ""}
      </Button>

  </div>
</Modal>


      {selectedMessage && (
  <Modal
    open={Boolean(selectedMessage)}
    onClose={() => setSelectedMessage(null)}
    className="flex items-center justify-center p-4"
  >
    <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-start mb-4">
        <Typography variant="h5" className="font-semibold">
          {selectedMessage.subject}
        </Typography>
        <IconButton
          onClick={() => setSelectedMessage(null)}
          className="!text-gray-600"
        >
          <MdClose className="text-xl" />
        </IconButton>
      </div>
      <Typography variant="body1" className="whitespace-pre-wrap mb-4">
        {selectedMessage.content}
      </Typography>
      <Typography variant="caption" className="text-gray-500 block">
        Received {formatDistanceToNow(new Date(selectedMessage.createdAt), { addSuffix: true })}
      </Typography>
    </div>
  </Modal>
)}

<Modal
  open={showGuidelines}
  onClose={() => setShowGuidelines(false)}
  className="flex items-center justify-center p-4"
>
  <div className="bg-gray-50 p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 shadow-md">
    <div className="flex justify-between items-start mb-4">
      <Typography variant="h4" className="font-bold mb-4 !font-marcellus">
        Read Before Submit
      </Typography>
      <IconButton
        onClick={() => setShowGuidelines(false)}
        className="!text-black"
      >
        <MdClose className="text-xl" />
      </IconButton>
    </div>
    
    <div className="space-y-4 font-pt-serif">
      {[
        {
          title: "Three photos per day.",
          content: `You can submit up to three original photos per day, 
          each showcasing your unique perspective and creative vision. 
          If your photo is not approved, it will be deleted from our database.`
        },
        {
          title: "High-Quality Image",
          content: `Your photo should have a minimum resolution of 2500px on the
longest side. We recommend submitting in JPEG or PNG format. `
        },
 {
      title: "File Size Limit",
      content: `Each photo must not exceed 5 MB in size. This ensures quick uploads 
and smooth viewing experiences for everyone. Optimize your images before submission 
while maintaining quality.`
    },

        {
          title: "No Watermarks, Logos, or Frames",
          content: `To keep the focus on your photography, please
avoid adding watermarks, logos, or frames to your image. Your photo should be as
natural as possible, ready for display.`
        },
        {
          title: "Keep Edits Simple",
          content: `We encourage you to capture your photos in-camera without
relying heavily on post-editing. Extreme edits, heavy filters, or drastic alterations
will not be accepted. You can make basic edits (such as adjusting brightness,
contrast, or cropping) to enhance your photo, but try to keep the image true to what
you captured.`
        },
        {
          title: "Tell Your Story",
          content: `When submitting your photo, include a brief description. Why did
you take the photo? When and where did you capture the moment? How did you
take the shot? This helps our reviewers select the best submissions and allows your
story to shine through.`
        },
        {
          title: "Respectful Content",
          content: `We strive to maintain a positive, inclusive space. Please ensure
your photo is respectful and appropriate for all audiences.`
        },
        {
          title: "Social Media Feature",
          content: `By submitting your photo daily, you could be
featured as Today's Best Click on our website and social media channels! We review
all submissions and select the standout shots to showcase.`
        },
        {
          title: "Create Your Own Gallery",
          content: `With each photo you submit, you’ll build your personal
gallery on our website. Over time, you’ll be able to look back and see how your skills
have evolved through daily practice.`
        },
        {
          title: "Engage with the Community",
          content: `Feel free to comment, like, and interact with other
photographers. Sharing experiences, providing feedback, and engaging with the
community is an inspiring part of this journey.`
        },
        {
          title: "Use #momento_bestclick",
          content: `Want to increase your chances of being noticed? Use the
hashtag #momento_bestclick on social media and tag us to get featured on our
platforms!`
        }
      ].map((item, index) => (
        <div key={index} className="flex gap-3">
          <div className="flex-shrink-0">
            
          </div>
          <div>
            <Typography variant="h6" className="!font-semibold !font-marcellus">
              {item.title}
            </Typography>
            <Typography variant="body1" className="!text-gray-700 !font-pt-serif">
              {item.content}
            </Typography>
          </div>
        </div>
      ))}
    </div>

    <Button
      fullWidth
      variant="contained"
      className="!mt-6 !bg-black !text-white !rounded-none"
      onClick={() => setShowGuidelines(false)}
    >
      I Understand
    </Button>
  </div>
</Modal>

    </section>
  );
}



export default MyAccount;