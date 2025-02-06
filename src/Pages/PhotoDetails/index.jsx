import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { Rating, Button, TextField } from "@mui/material"; // Make sure to import these from Material-UI
import Breadcrumbs from "@mui/material/Breadcrumbs"; // Import Breadcrumbs from Material-UI

function PhotoDetails() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const data = await fetchDataFromApi(`/api/product/${id}`);
        setPhoto(data.product);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPhotoDetails();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!photo)
    return (
      <div className="text-center py-10 text-gray-500">Photo not found</div>
    );

  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      const newReview = { user: "Guest", rating, comment: reviewText };
      setReviews([...reviews, newReview]);
      setReviewText("");
      setRating(0);
    }
  };

  return (
    <div className="container mx-auto p-5">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs className="text-gray-600 mb-6">
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link to="/photolisting" className="hover:text-blue-500">
          Photos
        </Link>
        <span className="text-gray-500">{photo.title}</span>
      </Breadcrumbs>

      {/* Image and Details Section */}
      <div className="flex flex-col lg:flex-row gap-10 bg-white p-6 rounded-lg shadow-lg">
        {/* Image */}
        <div className="lg:w-2/3">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Details */}
        <div className="lg:w-1/3 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{photo.name}</h2>
          <p className="text-gray-600 text-sm">By {photo.sellerr?.name}</p>

          <div className="flex items-center gap-2">
            <Rating value={photo.rating} precision={0.1} readOnly />
            <span className="text-gray-600 text-sm">({photo.rating})</span>
          </div>

          <p className="text-2xl font-semibold text-blue-600">{photo.price}</p>
          <p className="text-gray-500">{photo.description}</p>

          <div className="flex gap-4 mt-4">
            <Button variant="contained" color="primary" size="large">
              Buy Now
            </Button>
            <Button variant="outlined" color="primary" size="large">
              Download Preview
            </Button>
            <Button variant="contained" color="secondary" size="large">
              Add to Cart
            </Button>
          </div>

          <div className="text-gray-600 text-sm mt-6">
            <p>
              <strong>Resolution:</strong> {photo.resolution}
            </p>
            <p>
              <strong>License:</strong> {photo.license}
            </p>
            <p>
              <strong>Formats:</strong>{" "}
              {photo.formats?.join(", ") || "No formats available"}
            </p>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{review.user}</span>
                  <Rating
                    value={review.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </div>
                <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No reviews yet. Be the first to leave one!
          </p>
        )}

        {/* Add Review */}
        <div className="mt-6 p-4 border rounded-lg bg-white">
          <h4 className="text-lg font-semibold">Leave a Review</h4>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            precision={0.5}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            label="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="mt-4"
          />
          <Button
            variant="contained"
            color="primary"
            className="mt-4"
            onClick={handleReviewSubmit}
            disabled={!rating || !reviewText.trim()}
          >
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetails;
