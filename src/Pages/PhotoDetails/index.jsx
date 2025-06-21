import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { normalizeFancyText } from "../../utils/normalizeFancyText";
import { BsArrowLeft } from "react-icons/bs";
import { fetchDataFromApi } from "../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaInstagramSquare, FaLink } from "react-icons/fa";
import SEO from "../../components/SEO";

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
      {photo && (
        <SEO
          title={normalizeFancyText(photo.title)}
          description={normalizeFancyText(photo.description)}
          image={photo.images?.[0]?.url}
          type="website"
          author={photo.user?.name}
          publishedTime={photo.createdAt}
        />
      )}
      
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
              
            </div>
          </div>

          

          {/* Details Section */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-gray-50 p-8 shadow-xl">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 font-marcellus">
                {normalizeFancyText(photo.title)}
              </h1>
              <p className="text-lg text-gray-900 leading-relaxed mb-8 font-pt-serif">
                {normalizeFancyText(photo.description)}
              </p>

              <div className="m-4">

              <p className="text-sm text-gray-500 mb-1">Upload Date</p>
  <p className="font-medium text-gray-700">
    {new Date(photo.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
  </p>
  </div>

              {/* Author Section */}
              <Link 
        to={`/user/${photo.user?._id}`} 
        className="flex items-center space-x-4 mb-8 hover:bg-gray-100 transition-colors p-2 rounded"
      >
        <img
          src={photo.user?.avatar}
          alt={photo.user?.name}
          className="w-14 h-14  object-cover border-2 border-gray-200"
        />
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {photo.user?.name}
          </p>
          <p className="text-sm text-gray-500">Photographer</p>
        </div>
      </Link>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                
                {/* Share Buttons Section */}
<div className="mt-12">
  <h3 className="text-xl font-semibold text-gray-800 mb-4 font-pt-serif">
    Share this photo
  </h3>
  <div className="flex items-center space-x-4 text-2xl">
    {/* Facebook */}
    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800"
    >
      <FaFacebookSquare />
    </a>

    {/* Twitter */}
    <a
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(photo.title)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-600"
    >
      <FaTwitterSquare />
    </a>

    {/* LinkedIn */}
    <a
      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(photo.title)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-700 hover:text-blue-900"
    >
      <FaLinkedin />
    </a>

    {/* Instagram (Not for direct sharing, just a placeholder link) */}
    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-pink-500 hover:text-pink-700"
    >
      <FaInstagramSquare />
    </a>

    {/* Copy Link */}
    <button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }}
      className="text-gray-600 hover:text-black"
      title="Copy link"
    >
      <FaLink />
    </button>
  </div>
</div>

              </div>
            </div>

            {/* Metadata */}
           
          </div>
        </div>





        {/* Similar Photos */}
        {relatedPhotos.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 font-pt-serif">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                   flex items-end p-4 font-pt-serif">
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

