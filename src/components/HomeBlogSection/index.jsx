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
    <div className="bg-gray flex flex-col justify-center items-center">
      <h2 className="font-semibold text-[25px] px-10">Blogs</h2>

      {blogs.length === 0 ? (
        <p className="text-gray-600 text-center py-6">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              img={blog?.image || "https://via.placeholder.com/300"} // ✅ Fallback image
              title={blog?.title || "Untitled Blog"} // ✅ Fallback title
              intro={
                blog?.description?.substring(0, 100) + "..." ||
                "No description available."
              }
              id={blog._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeBlogSection;
