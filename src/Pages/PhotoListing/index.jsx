import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";

function PhotoListing() {
  const [allPhotos, setAllPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const LIMIT = 8;

  const fetchPhotos = async (currentPage) => {
    try {
      setLoading(true);
      const data = await fetchDataFromApi(`/api/photo/approved?page=${currentPage}&limit=${LIMIT}`);
      if (data?.photos?.length > 0) {
        if (currentPage === 1) {
          setAllPhotos(data.photos); 
        } else {
          setAllPhotos(prev => [...prev, ...data.photos]); 
        }
  
        if (data.photos.length < LIMIT || allPhotos.length + data.photos.length >= data.totalPhotos) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos(page);
  }, [page]);

  const handleImageClick = (id) => {
    navigate(`/photodetails/${id}`);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto text-center mb-12 px-4">
        <h2 className="text-4xl font-bold text-gray-900 font-marcellus mb-10">Photos</h2>
      </div>

      <div className="container mx-auto px-4">
        {allPhotos.length === 0 && !loading ? (
          <div className="text-center text-gray-500 text-lg mt-12">
            No photos available. Please check back later.
          </div>
        ) : (
          <div className="columns-1 sm:columns-1 lg:columns-2 xl:columns-2 gap-6 space-y-6">
            {allPhotos.map((photo) => (
              <div key={photo._id} className="relative group break-inside-avoid" onClick={() => handleImageClick(photo._id)}>
                <div className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-zoom-in" onContextMenu={handleContextMenu}>
                  <img
                    src={photo.images?.[0]?.url}
                    loading="lazy"
                    alt={photo.title || "Untitled Photo"}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="text-white">
                      <h3 className="text-xl font-bold font-marcellus mb-1">{photo.title || "Untitled Photo"}</h3>
                      <p className="text-sm opacity-90 font-pt-serif">by {photo.user?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-6 py-3 bg-gray-50 text-gray-900 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default PhotoListing;
