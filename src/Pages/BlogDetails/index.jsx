import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogAPI } from "../../utils/api";
import SafeHTML from "../../components/SafeHTML";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogAPI.getById(id);
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg animate-pulse">Loading blog post...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Retry
        </button>
      </div>
    );

  if (!blog) return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="relative bg-gray-50 text-gray-900 py-24 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 font-marcellus">{blog.title}</h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm md:text-base opacity-90">
          <div className="flex items-center gap-2">
  <span className="font-medium">By:</span>
  <span>{blog.author || "Unknown Author"}</span>
</div>
            {blog.createdAt && (
              <div>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(blog.createdAt))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 md:px-8 mt-12">
        {/* Image Section */}
        <div className="relative mb-8 overflow-hidden">
          <img
            src={blog.image || "https://via.placeholder.com/1200x675"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose lg:prose-xl max-w-4xl mx-auto">
          <SafeHTML html={blog.description} />
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-16 bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Want to read more blogs?
          </h2>
          <p className="text-gray-600 mb-6">
            Explore other articles written by talented authors on our platform.
          </p>
          <a
            href="/bloglisting"
            className="inline-block px-6 py-3 bg-gray-50 text-gray-900 font-semibold shadow transition duration-300"
          >
            Browse Blogs
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;