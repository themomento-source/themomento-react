import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { Rating, Button, TextField, IconButton } from "@mui/material";
import { FaHeart, FaRegHeart, FaDownload, FaShoppingCart } from "react-icons/fa";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { motion } from "framer-motion";

function PhotoDetails() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

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

  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      const newReview = { user: "Guest", rating, comment: reviewText };
      setReviews([...reviews, newReview]);
      setReviewText("");
      setRating(0);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!photo)
    return (
      <div className="text-center py-20 text-gray-500">Photo not found</div>
    );

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        user: "User",
        text: commentText,
        date: new Date().toISOString(),
      };
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb" className="!mb-8 !text-gray-600">
        <Link to="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <Link
          to="/photolisting"
          className="hover:text-blue-600 transition-colors"
        >
          Photos
        </Link>
        <span className="text-gray-900">{photo.title}</span>
      </Breadcrumbs>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Image Display */}
        <div className="lg:col-span-2">
          <div className="relative group bg-white shadow-lg rounded-lg">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative rounded-lg overflow-hidden flex items-center justify-center min-h-[70vh]"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-auto max-h-[80vh] object-contain cursor-zoom-in"
              />
            </motion.div>

            {/* Floating Action Bar */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                variant="contained"
                startIcon={<FaDownload />}
                className="!bg-blue-600 !text-white hover:!bg-blue-700 !rounded-lg !shadow-md"
              >
                Download
              </Button>
              <IconButton
                onClick={() => setIsLiked(!isLiked)}
                className="!text-red-500 !bg-white/90 hover:!bg-white !shadow-md"
              >
                {isLiked ? (
                  <FaHeart className="text-xl" />
                ) : (
                  <FaRegHeart className="text-xl" />
                )}
              </IconButton>
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
          <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-200">
            {/* Purchase Box */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  {photo.name}
                </h1>
                <Rating
                  value={photo.rating}
                  precision={0.1}
                  readOnly
                  className="!text-yellow-500"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      {photo.price}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Commercial license included
                    </p>
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<FaShoppingCart />}
                    className="!bg-blue-600 !text-white hover:!bg-blue-700 !rounded-lg !px-6 !py-3"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Key Details */}
              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between items-center">
                  <span>Resolution</span>
                  <span className="font-medium">{photo.resolution}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>File Type</span>
                  <span className="font-medium">
                    {photo.formats?.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>License ID</span>
                  <span className="text-blue-600 font-medium">
                    #{photo.licenseId}
                  </span>
                </div>
              </div>

              {/* Extended Description */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  About this image
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {photo.description}
                </p>
              </div>

              {/* Usage Rights */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-gray-900 font-semibold mb-2">
                  Permitted uses:
                </h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li>• Digital advertisements</li>
                  <li>• Print materials</li>
                  <li>• Website backgrounds</li>
                  <li>• Social media content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Comments ({comments.length})
        </h3>

        {/* Comment Form */}
        <div className="mb-8 bg-gray-50 rounded-lg p-4">
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            label="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            InputProps={{
              className: "!text-gray-900 bg-white",
            }}
            className="!rounded-lg"
          />
          <div className="mt-4 flex justify-end">
            <Button
              variant="contained"
              className="!bg-blue-600 !text-white hover:!bg-blue-700 !rounded-lg !px-8 !py-2"
              onClick={handleCommentSubmit}
              disabled={!commentText.trim()}
            >
              Post Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {comment.user}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(comment.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mt-4">{comment.text}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No comments yet</p>
        )}
      </div>

      {/* Reviews Section */}
      <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews ({reviews.length})
        </h3>

        {/* Review Form */}
        <div className="mb-8 bg-gray-50 rounded-lg p-4">
          <div className="flex gap-4 items-center">
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              precision={0.5}
              className="!text-yellow-500"
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              label="Write a review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              InputProps={{
                className: "!text-gray-900 bg-white",
              }}
              className="!rounded-lg"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              variant="contained"
              className="!bg-blue-600 !text-white hover:!bg-blue-700 !rounded-lg !px-8 !py-2"
              onClick={handleReviewSubmit}
              disabled={!reviewText.trim()}
            >
              Submit Review
            </Button>
          </div>
        </div>

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {review.user}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-yellow-500">
                  <Rating value={review.rating} readOnly precision={0.5} />
                </div>
                <p className="text-gray-600 mt-2">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet</p>
        )}
      </div>
    </div>
  );
}

export default PhotoDetails;
