import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogAPI } from "../../utils/api"; // Make sure this points to your API functions
import SafeHTML from ".././../components/SafeHTML";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log("Fetching blog with ID:", id); // Debugging

        const response = await blogAPI.getById(id);
        console.log("API Response:", response); // Debugging

        if (response && response._id) {
          setBlog(response);
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        setError(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 md:px-8">
      <h1 className="text-3xl font-bold my-4">
        {blog?.title || "Untitled Blog"}
      </h1>

      {/* Blog Cover Image */}
      <img
        src={blog.image || "https://via.placeholder.com/600"}
        alt={blog.title || "Blog Cover"}
        className="w-[1200]] h-[800px] object-cover rounded-lg shadow-lg"
      />

      {/* Blog Author */}
      <p className="text-lg font-semibold my-2">
        By: {blog.author?.name || "Unknown"}
      </p>

      {/* Blog Description */}
      <p className="text-gray-700 leading-relaxed">
        <SafeHTML html={blog.description} />
      </p>
    </div>
  );
};

export default BlogDetails;
