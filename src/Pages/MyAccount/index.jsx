import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { MdFileUpload, MdDashboard, MdSettings, MdLogout } from "react-icons/md";
import { FaRegUser, FaWallet, FaImages, FaShoppingBag } from "react-icons/fa";

function MyAccount() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [purchasedPhotos, setPurchasedPhotos] = useState([]);

  // Mock fetch user's photos on page load
  useEffect(() => {
    // Mocked response, replace with actual axios call when ready
    const mockPhotos = [
      { _id: "1", title: "Photo 1", description: "Description 1", price: 100, imageUrl: "https://via.placeholder.com/150" },
      { _id: "2", title: "Photo 2", description: "Description 2", price: 150, imageUrl: "https://via.placeholder.com/150" },
    ];
    setPhotos(mockPhotos);
  }, []);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title || !price || !description) {
      alert("Please fill all fields and upload a photo!");
      return;
    }

    // Mocked response for file upload, replace with actual axios call when ready
    const mockResponse = {
      data: {
        _id: new Date().getTime().toString(),
        title,
        description,
        price,
        imageUrl: "https://via.placeholder.com/150", // Mock image URL
      },
    };

    try {
      // Simulating the backend response
      setPhotos([...photos, mockResponse.data]);

      alert("Photo submitted for publishing!");

      // Reset form
      setTitle("");
      setPrice("");
      setDescription("");
      setFile(null);
    } catch (err) {
      console.error("Error submitting photo:", err);
      alert("Error submitting photo");
    }
  };

  const handlePurchasePhoto = async (photoId) => {
    try {
      const photoToPurchase = photos.find(photo => photo._id === photoId);
      setPurchasedPhotos([...purchasedPhotos, photoToPurchase]);

      // Mocking the purchase update, replace with actual axios call when ready
      alert(`Purchased photo: ${photoToPurchase.title}`);
    } catch (err) {
      console.error("Error purchasing photo:", err);
      alert("Error purchasing photo");
    }
  };

  return (
    <section className="py-10 w-full bg-gray-900 min-h-screen text-white">
      <div className="container flex gap-8">
        {/* Sidebar */}
        <div className="col1 w-[25%]">
          <div className="card bg-gray-800 shadow-lg rounded-lg p-6">
            {/* Profile Picture */}
            <div className="w-full p-3 flex items-center justify-center flex-col">
              <div className="w-[150px] h-[150px] rounded-full overflow-hidden mb-4 relative group border-4 border-gray-600">
                <img
                  src="https://images.pexels.com/photos/5257495/pexels-photo-5257495.jpeg"
                  className="w-full h-full object-cover cursor-pointer transition-all duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-[22px] font-bold">Anna Shvets</h3>
              <p className="text-gray-400 text-sm">anna.shvets@email.com</p>
              <p className="text-green-400 font-semibold mt-2">
                $250.00 Balance
              </p>
              <p className="text-blue-400 text-sm">Premium Membership</p>
            </div>

            {/* Navigation */}
            <ul className="list-none pb-5 flex flex-col items-start mt-6">
              <NavItem icon={<MdDashboard />} text="Dashboard" />
              <NavItem icon={<FaImages />} text="My Photos" />
              <NavItem icon={<FaShoppingBag />} text="Orders" />
              <NavItem icon={<FaWallet />} text="Wallet" />
              <NavItem icon={<MdSettings />} text="Settings" />
              <NavItem icon={<MdLogout />} text="Logout" className="text-red-400" />
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col2 w-[75%]">
          <div className="bg-gray-800 shadow-lg rounded-lg p-6">
            {/* Upload New Photo */}
            <h2 className="text-xl font-semibold mb-4">Upload New Photo</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-sm text-gray-300">Title</label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-300">Price</label>
                <input
                  type="number"
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-300">Description</label>
                <textarea
                  className="w-full p-3 bg-gray-700 text-white rounded-lg"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* File Input */}
              <div
                className="w-full p-5 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition"
                onClick={() => document.getElementById("fileUpload").click()}
              >
                <MdFileUpload className="text-white text-5xl" />
                <p className="mt-2 text-gray-400">Click to upload or drag & drop</p>
              </div>
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={handleFileUpload}
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 mt-4 py-3 text-white"
              >
                Submit for Publishing
              </Button>
            </form>

            {/* My Published Photos */}
            <h2 className="text-xl font-semibold mt-8 mb-4">My Published Photos</h2>
            <div className="grid grid-cols-2 gap-6">
              {photos.map((photo) => (
                <div key={photo._id} className="card bg-gray-700 p-4 rounded-lg">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="text-lg font-bold">{photo.title}</h3>
                  <p className="text-sm text-gray-400">{photo.description}</p>
                  <p className="font-semibold mt-2">${photo.price}</p>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handlePurchasePhoto(photo._id)}
                  >
                    Purchase
                  </Button>
                </div>
              ))}
            </div>

            {/* Purchased Photos */}
            <h2 className="text-xl font-semibold mt-8 mb-4">Purchased Photos</h2>
            <div className="grid grid-cols-2 gap-6">
              {purchasedPhotos.map((photo) => (
                <div key={photo._id} className="card bg-gray-700 p-4 rounded-lg">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="text-lg font-bold">{photo.title}</h3>
                  <p className="text-sm text-gray-400">{photo.description}</p>
                  <p className="font-semibold mt-2">${photo.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Navigation Item
const NavItem = ({ icon, text, className = "" }) => (
  <li className="w-full text-left flex justify-start">
    <Button
      className={`w-full rounded-none !capitalize text-gray-400 py-3 ${className}`}
      startIcon={icon}
    >
      {text}
    </Button>
  </li>
);

export default MyAccount;
