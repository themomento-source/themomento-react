import React, { useState, useContext } from "react";
import {
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
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
import { useNavigate } from "react-router-dom";
import { editData } from "../../utils/api.js";

function MyAccount() {
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [activeTab, setActiveTab] = useState("selling");
  const { userData, setUserData, openAlertBox, setIsLogin } =
    useContext(MyContext);
  const navigate = useNavigate();

  const sellingPhotos = [
    {
      id: 1,
      title: "Mountain Landscape",
      price: 49,
      sales: 12,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      title: "City Night",
      price: 39,
      sales: 8,
      image: "https://via.placeholder.com/300",
    },
  ];

  const purchasedPhotos = [
    {
      id: 3,
      title: "Beach Sunset",
      price: 29,
      author: "Photographer1",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 4,
      title: "Forest Path",
      price: 35,
      author: "Photographer2",
      image: "https://via.placeholder.com/300",
    },
  ];

  const stats = [
    { title: "Total Sales", value: "$1,240", icon: <MdShoppingBag /> },
    { title: "Total Earnings", value: "$620", icon: <MdPhotoLibrary /> },
    { title: "Purchases", value: "24 Photos", icon: <MdCloudUpload /> },
    { title: "Wallet Balance", value: "$150", icon: <MdCloudUpload /> },
  ];

  const handleAvatarUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
        openAlertBox("error", "Only JPG/PNG/WEBP images are allowed");
        return;
      }

      setUploadingAvatar(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await editData("/api/user/user-avatar", formData);

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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLogin(false);
    navigate("/login");
  };

  return (
    <section className="py-8 w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            {/* Profile Section */}
            <div className="text-center mb-6">
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
                        <span className="text-gray-500 text-sm">Add Photo</span>
                      </div>
                    )}
                  </div>
                </label>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {userData?.name || "User Name"}
              </h3>
              <p className="text-sm text-gray-600">{userData?.email}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              <Button
                fullWidth
                startIcon={<MdDashboard />}
                className="!justify-start !text-gray-600 hover:!bg-gray-50"
              >
                Dashboard
              </Button>
              <Button
                fullWidth
                startIcon={<MdPhotoLibrary />}
                className="!justify-start !text-gray-600 hover:!bg-gray-50"
                onClick={() => setActiveTab("selling")}
              >
                My Photos
              </Button>
              <Button
                fullWidth
                startIcon={<MdShoppingBag />}
                className="!justify-start !text-gray-600 hover:!bg-gray-50"
                onClick={() => setActiveTab("buying")}
              >
                Purchases
              </Button>
              <Button
                fullWidth
                startIcon={<MdSettings />}
                className="!justify-start !text-gray-600 hover:!bg-gray-50"
              >
                Settings
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
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-sm border border-gray-200">
                <CardContent className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                    {stat.icon}
                  </div>
                  <div>
                    <Typography variant="body2" className="text-gray-600">
                      {stat.title}
                    </Typography>
                    <Typography variant="h6" className="font-semibold">
                      {stat.value}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Tabs */}
          <Card className="shadow-sm border border-gray-200">
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              className="border-b border-gray-200"
            >
              <Tab
                label="Your Photos for Sale"
                value="selling"
                className="!font-medium"
              />
              <Tab
                label="Purchased Photos"
                value="buying"
                className="!font-medium"
              />
            </Tabs>

            {/* Selling Content */}
            {activeTab === "selling" && (
              <div className="p-6">
                <div className="mb-6">
                  <Button
                    variant="contained"
                    startIcon={<MdCloudUpload />}
                    className="!bg-blue-600 !text-white hover:!bg-blue-700"
                  >
                    Upload New Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sellingPhotos.map((photo) => (
                    <Card
                      key={photo.id}
                      className="shadow-sm border border-gray-200"
                    >
                      <CardMedia
                        component="img"
                        image={photo.image}
                        alt={photo.title}
                        className="h-48 object-cover"
                      />
                      <CardContent>
                        <Typography variant="h6" className="font-semibold mb-2">
                          {photo.title}
                        </Typography>
                        <div className="flex justify-between items-center">
                          <Chip
                            label={`$${photo.price}`}
                            className="!bg-green-100 !text-green-800"
                          />
                          <span className="text-sm text-gray-600">
                            {photo.sales} sales
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Buying Content */}
            {activeTab === "buying" && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {purchasedPhotos.map((photo) => (
                    <Card
                      key={photo.id}
                      className="shadow-sm border border-gray-200"
                    >
                      <CardMedia
                        component="img"
                        image={photo.image}
                        alt={photo.title}
                        className="h-48 object-cover"
                      />
                      <CardContent>
                        <Typography variant="h6" className="font-semibold mb-2">
                          {photo.title}
                        </Typography>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            by {photo.author}
                          </span>
                          <Chip
                            label={`$${photo.price}`}
                            className="!bg-blue-100 !text-blue-800"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
