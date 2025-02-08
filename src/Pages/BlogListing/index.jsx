import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import { blogAPI } from "../../utils/api";
import SafeHTML from "../../components/SafeHTML";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function BlogListing() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogAPI.getAll("?limit=6");
        console.log(response); // Debugging the API response structure
        if (response?.success) {
          setBlogs(response.data.blogs);
        } else {
          setError("Failed to load blogs");
        }
      } catch (err) {
        setError(err.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return (
      <div className="text-center py-8">
        <CircularProgress />
      </div>
    );

  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <section className="py-10 bg-gray-100">
      {/* Hero Section */}
      <div className="bg-white shadow-md py-10 text-center">
        <Typography variant="h3" className="text-gray-800 font-bold">
          Blog & Articles
        </Typography>
        <Breadcrumbs
          aria-label="breadcrumb"
          className="flex justify-center mt-3"
        >
          <Link
            underline="hover"
            color="inherit"
            href="/"
            onClick={handleClick}
          >
            Home
          </Link>
          <Typography color="text.primary">Blogs</Typography>
        </Breadcrumbs>
      </div>

      <div className="container mx-auto mt-8 flex flex-col lg:flex-row gap-8 px-4">
        {/* Blog Grid */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <BlogCard
                img={blog.image}
                title={blog.title}
                author={blog.author?.name || "Unknown Author"}
                intro={
                  <SafeHTML
                    html={(blog.description || "").substring(0, 100) + "..."}
                  />
                }
                id={blog._id}
              />
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white shadow-lg rounded-lg p-6">
          <Typography variant="h5" className="text-gray-700 font-semibold mb-4">
            Featured Posts
          </Typography>
          {blogs.slice(0, 2).map((blog, index) => (
            <div
              key={index}
              className="mb-4 flex items-center gap-4 border-b pb-3"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <Typography
                  variant="h6"
                  className="text-gray-800 font-semibold"
                >
                  {blog.title}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {blog.author?.name || "Unknown Author"}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogListing;
