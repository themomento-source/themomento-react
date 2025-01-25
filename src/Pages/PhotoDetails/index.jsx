import { Breadcrumbs, Button, Rating, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

// Sample data (Replace this with API fetching logic)
const photoData = [
  {
    id: "1",
    title: "Elegant Silhouette Photography",
    photographer: "John Doe",
    price: "$29.99",
    description:
      "A breathtaking silhouette portrait capturing the essence of solitude and mystery.",
    imageUrl:
      "https://images.pexels.com/photos/30230301/pexels-photo-30230301/free-photo-of-silhouette-woman-standing-by-window-in-dark-room.jpeg",
    resolution: "4000x3000 px",
    license: "Royalty-free",
    formats: ["JPG", "PNG"],
    rating: 4.5,
    reviews: [
      { user: "Alice", rating: 5, comment: "Absolutely stunning!" },
      { user: "Bob", rating: 4, comment: "Great photo, loved the details." },
    ],
  },
];

function PhotoDetails() {
  const { id } = useParams();
  const photo = photoData.find((item) => item.id === id);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(photo ? photo.reviews : []);

  if (!photo) {
    return <div className="text-center py-10 text-gray-500">Photo not found</div>;
  }

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
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/photolisting" className="hover:text-blue-500">Photos</Link>
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
          <h2 className="text-3xl font-bold text-gray-900">{photo.title}</h2>
          <p className="text-gray-600 text-sm">By {photo.photographer}</p>

          <div className="flex items-center gap-2">
            <Rating value={photo.rating} precision={0.1} readOnly />
            <span className="text-gray-600 text-sm">({photo.rating})</span>
          </div>

          <p className="text-2xl font-semibold text-blue-600">{photo.price}</p>
          <p className="text-gray-500">{photo.description}</p>

          <div className="flex gap-4 mt-4">
            <Button variant="contained" color="primary" size="large">Buy Now</Button>
            <Button variant="outlined" color="primary" size="large">Download Preview</Button>
            <Button variant="contained" color="secondary" size="large">Add to Cart</Button>
          </div>

          <div className="text-gray-600 text-sm mt-6">
            <p><strong>Resolution:</strong> {photo.resolution}</p>
            <p><strong>License:</strong> {photo.license}</p>
            <p><strong>Formats:</strong> {photo.formats.join(", ")}</p>
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
                  <Rating value={review.rating} precision={0.5} readOnly size="small" />
                </div>
                <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
        )}

        {/* Add Review */}
        <div className="mt-6 p-4 border rounded-lg bg-white">
          <h4 className="text-lg font-semibold">Leave a Review</h4>
          <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} precision={0.5} />
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