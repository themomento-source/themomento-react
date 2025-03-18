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

  // Categorize blogs
  const learningBlogs = blogs.filter(blog => blog.categories?.includes('Learning'));
  const interviewBlogs = blogs.filter(blog => blog.categories?.includes('Interviews'));
  const generalBlogs = blogs.filter(blog => blog.categories?.includes('Blog'));

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogAPI.getAll("?limit=6");
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
          Community
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
        {/* Main Content */}
        <div className="w-full lg:w-3/4 space-y-12">
          {/* Learning Section */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="mb-6 border-b pb-4">
              <Typography variant="h4" className="text-gray-800 font-bold">
                Learning Resources
                <span className="ml-2 text-emerald-500">•</span>
              </Typography>
              <Typography variant="body1" className="text-gray-600 mt-2">
                Educational content and tutorials
              </Typography>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {learningBlogs.map(blog => (
                <BlogCard
                  key={blog._id}
                  img={blog.image}
                  title={blog.title}
                  author={blog.author?.name || "Unknown Author"}
                  intro={<SafeHTML html={(blog.description || "").substring(0, 100) + "..."} />}
                  id={blog._id}
                />
              ))}
            </div>
          </div>

          {/* Interviews Section */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="mb-6 border-b pb-4">
              <Typography variant="h4" className="text-gray-800 font-bold">
                Interview Preparation
                <span className="ml-2 text-blue-500">•</span>
              </Typography>
              <Typography variant="body1" className="text-gray-600 mt-2">
                Career advice and interview tips
              </Typography>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {interviewBlogs.map(blog => (
                <BlogCard
                  key={blog._id}
                  img={blog.image}
                  title={blog.title}
                  author={blog.author?.name || "Unknown Author"}
                  intro={<SafeHTML html={(blog.description || "").substring(0, 100) + "..."} />}
                  id={blog._id}
                />
              ))}
            </div>
          </div>

          {/* General Blogs Section */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="mb-6 border-b pb-4">
              <Typography variant="h4" className="text-gray-800 font-bold">
                Latest Stories
                <span className="ml-2 text-purple-500">•</span>
              </Typography>
              <Typography variant="body1" className="text-gray-600 mt-2">
                Recent updates and articles
              </Typography>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {generalBlogs.map(blog => (
                <BlogCard
                  key={blog._id}
                  img={blog.image}
                  title={blog.title}
                  author={blog.author?.name || "Unknown Author"}
                  intro={<SafeHTML html={(blog.description || "").substring(0, 100) + "..."} />}
                  id={blog._id}
                />
              ))}
            </div>
          </div>
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