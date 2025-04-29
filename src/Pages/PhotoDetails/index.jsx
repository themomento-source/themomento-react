import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { FaDownload, FaRegHeart } from "react-icons/fa";
import { fetchDataFromApi } from "../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import ImageProtector from "../../components/ImageProtector";

function PhotoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  const [relatedPhotos, setRelatedPhotos] = useState([]);

 

  useEffect(() => {
    if (photo?.categories?.[0]?._id) {
      fetchDataFromApi(`/api/photo/approved?category=${photo.categories[0]._id}&limit=4`)
        .then(data => setRelatedPhotos(data.photos || []));
    }
  }, [photo]);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const response = await fetchDataFromApi(`/api/photo/${id}`);
        if (response.success) {
          setPhoto(response.photo);
        } else {
          setError("Photo not found");
        }
      } catch (err) {
        setError("Failed to fetch photo details");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate("/photolisting")}
          className="mb-8 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <BsArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Gallery</span>
        </button>

        {/* Main Content Container */}
        <div className="flex flex-col">
          {/* Image Section - Full Width */}
          <div className="w-full max-h-screen mb-12">
            <div className="bg-white p-4 flex items-center justify-center">
              <ImageProtector>
                <img
                  src={photo.images?.[0]?.url}
                  alt={photo.title}
                  className="w-auto max-w-full max-h-[80vh] object-contain"
                  style={{ 
                    aspectRatio: photo.dimensions?.width && photo.dimensions?.height 
                      ? `${photo.dimensions.width}/${photo.dimensions.height}`
                      : 'auto'
                  }}
                />
              </ImageProtector>
            </div>
          </div>

          {/* Details Section */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-white p-8 shadow-xl">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
                {photo.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {photo.description}
              </p>

              {/* Author Section */}
              <div className="flex items-center space-x-4 mb-8">
                <img
                  src={photo.user?.profileImage || "/default-avatar.jpg"}
                  alt={photo.user?.name}
                  className="w-14 h-14  object-cover border-2 border-gray-200"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {photo.user?.name}
                  </p>
                  <p className="text-sm text-gray-500">Photographer</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white hover:shadow-lg transition-all">
                  <FaDownload className="w-5 h-5" />
                  <span>Download</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-colors">
                  <FaRegHeart className="w-5 h-5" />
                  <span>Like</span>
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Upload Date</p>
                <p className="font-medium text-gray-700">
                  {new Date(photo.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Resolution</p>
                <p className="font-medium text-gray-700">
                  {photo.dimensions?.width || 'Unknown'} x {photo.dimensions?.height || 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Photos */}
        {relatedPhotos.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 font-serif">
              Similar Photos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedPhotos.map((relatedPhoto) => (
                <div 
                  key={relatedPhoto._id}
                  className="group relative bg-white shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => navigate(`/photodetails/${relatedPhoto._id}`)}
                >
                  <img
                    src={relatedPhoto.images?.[0]?.url}
                    alt={relatedPhoto.title}
                    className="w-full h-48 object-cover"

                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent  flex items-end p-4">
                    <p className="text-white font-medium truncate">
                      {relatedPhoto.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoDetails;