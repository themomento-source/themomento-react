import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SEO from "../../components/SEO";

import { blogAPI } from "../../utils/api";
import SafeHTML from "../../components/SafeHTML";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { LiaCopy } from "react-icons/lia";

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

  // Extract tags from blog content or categories
  const tags = blog.tags || blog.category ? [blog.category] : [];
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO
        title={blog.title}
        description={blog.description}
        image={blog.image || blog.bodyImages?.[0]?.url}
        type="article"
        author={blog.author}
        publishedTime={blog.createdAt}
        modifiedTime={blog.updatedAt}
        tags={tags}
      />
      
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

{/* Social Media Share Icons */}
<div className="flex flex-wrap justify-center gap-4 text-gray-600 text-xl mb-6">
  {/* Facebook */}
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-600 transition"
  >
    <FaFacebookF />
  </a>

  {/* Twitter */}
  <a
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-400 transition"
  >
    <FaTwitter />
  </a>

  {/* LinkedIn */}
  <a
    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-700 transition"
  >
    <FaLinkedinIn />
  </a>

  {/* WhatsApp */}
  <a
    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + " " + window.location.href)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-green-500 transition"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
      <path d="M16.002 3.2a12.794 12.794 0 0 0-11.03 19.319l-1.169 4.276a1 1 0 0 0 1.236 1.236l4.276-1.17A12.802 12.802 0 1 0 16.002 3.2zm6.955 18.028c-.28.789-1.603 1.472-2.257 1.572-.578.086-1.287.123-2.07-.135-.478-.156-1.092-.354-1.886-.693-3.326-1.44-5.497-4.992-5.664-5.236-.165-.245-1.35-1.794-1.35-3.428 0-1.633.857-2.435 1.165-2.769.308-.334.673-.417.897-.417.224 0 .448.002.64.012.206.011.48-.078.751.57.28.68.957 2.342 1.041 2.51.083.166.138.36.025.58-.114.221-.171.358-.336.55-.166.192-.352.429-.503.578-.167.165-.34.344-.148.676.193.332.861 1.42 1.844 2.3 1.264 1.138 2.33 1.488 2.662 1.653.332.165.527.138.723-.083.196-.221.834-.96 1.057-1.29.223-.33.448-.276.752-.165.304.11 1.917.905 2.244 1.07.327.165.546.248.627.386.082.137.082.786-.197 1.576z" />
    </svg>
  </a>

  {/* Facebook Messenger */}
  <a
    href={`fb-messenger://share/?link=${encodeURIComponent(window.location.href)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-500 transition"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
      <path d="M16 3C8.82 3 3 8.08 3 14.25c0 3.21 1.56 6.1 4.06 8.08v5.17l4.45-2.44c1.36.38 2.82.58 4.49.58 7.18 0 13-5.08 13-11.25S23.18 3 16 3zm2.88 13.08l-3.23-3.48-5.73 3.48 6.35-6.52 3.24 3.47 5.72-3.47-6.35 6.52z" />
    </svg>
  </a>

  {/* Copy Link */}
<button
  onClick={() => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  }}
  className="text-gray-900 hover:underline transition text-sm flex items-center"
  title="Copy Link"
>
  <LiaCopy size={20} />
</button>

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