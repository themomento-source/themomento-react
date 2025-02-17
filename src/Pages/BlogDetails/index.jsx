import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogAPI } from "../../utils/api";
import SafeHTML from ".././../components/SafeHTML";
import { Helmet } from "react-helmet";

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

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

  if (!blog) return null; // Handle the case where blog is still null after loading






  // Function to strip HTML tags from the blog description
const stripHtmlTags = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

// Define Meta Variables
const metaTitle = blog?.title || "Default Blog Title"; // Fallback title
const metaDescription = blog?.description
  ? stripHtmlTags(blog.description).substring(0, 150) + "..."
  : "Read this amazing blog post!";
const metaImage = blog?.image || "https://via.placeholder.com/1200x675";

  return (
    <div className="bg-white py-12">


{/* React Helmet for Facebook Preview */}
<Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        
        {/* Facebook Open Graph Meta Tags */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Helmet>

      {" "}
      {/* White background and padding */}
      <div className="container mx-auto px-4 md:px-8">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-gray-800 leading-tight">
          {blog.title}
        </h1>

        {/* Meta Information (Author & Date if available) */}
        <div className="flex items-center justify-between mb-6 text-gray-600">
          <div className="flex items-center">
            <span className="mr-2">By:</span>
            <span className="font-medium">
              {blog.author?.name || "Unknown"}
            </span>
          </div>
          {/* Add date if available in your API response */}
          {blog.createdAt && ( // Assuming your API returns a createdAt field
            <div>
              {new Date(blog.createdAt).toLocaleDateString()}{" "}
              {/* Format the date */}
            </div>
          )}
        </div>

        {/* Cover Image with better responsiveness and aspect ratio */}
        <div className="relative mb-8 overflow-hidden rounded-lg shadow-lg aspect-[16/9]">
          {" "}
          {/* Aspect ratio */}
          <img
            src={blog.image || "https://via.placeholder.com/1200x675"} // Higher res placeholder
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="prose lg:prose-xl max-w-prose mx-auto">
          {" "}
          {/* Use prose class for styling */}
          <SafeHTML html={blog.description} />
        </div>

        {/* Optional: Social Sharing Icons */}
        {/* Optional: Related Posts Section */}
      </div>
    </div>
  );
};

export default BlogDetails;
