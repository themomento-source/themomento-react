import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material"; // ✅ Import fixed
import { blogAPI } from "../../utils/api";
import BlogCard from "../BlogCard";

function HomeBlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogAPI.getAll("?limit=3");
        if (response?.success && response?.data?.blogs) {
          setBlogs(response.data.blogs);
        } else {
          setError("No blogs found");
        }
      } catch (err) {
        setError("Error fetching blogs. Please try again later.");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {blogs.length === 0 ? (
          <p className="text-gray-400 text-center text-xl">
            No blogs available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                img={blog?.image || "/placeholder-blog.jpg"}
                title={blog?.title || "Capturing Moments"}
                id={blog._id}
                className="group relative overflow-hidden transform transition-all duration-500 hover:-translate-y-2"
              />
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105">
              View All Blogs
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeBlogSection;
