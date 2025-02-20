import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { blogAPI } from "../../utils/api";
import SafeHTML from ".././../components/SafeHTML";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
  const { id } = useParams();
  const location = useLocation();
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
    return <p className="text-center py-4 text-gray-500 animate-pulse">Loading blog post...</p>;

  if (error)
    return (
      <div className="text-center text-red-500 py-4">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );

  if (!blog) return null;

  return (
    <div className="bg-white py-12">
      {/* Dynamic SEO Metadata */}
      <Helmet>
        <title>{blog.title || "Blog Post"} | My Website</title>
        <meta name="description" content={blog.description || "Read the latest blog post on our site."} />

        {/* Open Graph (Facebook, LinkedIn, etc.) */}
        <meta property="og:title" content={blog.title || "Blog Post"} />
        <meta property="og:description" content={blog.description || "Check out this blog post!"} />
        <meta property="og:image" content={blog.image || "https://via.placeholder.com/1200x675"} />
        <meta property="og:url" content={`https://themomento.co.uk${location.pathname}`} />
        <meta property="og:type" content="article" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title || "Blog Post"} />
        <meta name="twitter:description" content={blog.description || "Check out this blog post!"} />
        <meta name="twitter:image" content={blog.image || "https://via.placeholder.com/1200x675"} />

      </Helmet>

      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 leading-tight">{blog.title}</h1>

        <div className="flex items-center justify-between mb-6 text-gray-600">
          <div className="flex items-center">
            <span className="mr-2">By:</span>
            <span className="font-medium">{blog.author?.name || "Unknown"}</span>
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

        <div className="relative mb-8 overflow-hidden rounded-lg shadow-lg aspect-[16/9]">
          <img
            src={blog.image || "https://via.placeholder.com/1200x675"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose lg:prose-xl max-w-prose mx-auto">
          <SafeHTML html={blog.description} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
