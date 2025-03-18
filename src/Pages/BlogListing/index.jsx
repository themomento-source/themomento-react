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
    <section className="py-10 bg-white">
      {/* Hero Section */}
      <div className="bg-amber-50 shadow-md py-10 text-center">
        <Typography variant="h3" className="text-black font-bold" style={{ fontFamily: '"Marcellus", serif' }}>
          Community
        </Typography>
      </div>

      <div className="container mx-auto mt-8 flex flex-col gap-8 px-4">
        {/* Learning and Interview Sections Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Learning Section */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="mb-6 border-b pb-4">
              <Typography variant="h4" className="text-black font-bold" style={{ fontFamily: '"Marcellus", serif' }}>
                Learning
                <span className="ml-2 text-emerald-500">•</span>
              </Typography>
              <Typography variant="body1" className="text-gray-600 mt-2" style={{ fontFamily: '"PT Serif", serif'}}>
                Educational content and tutorials
              </Typography>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
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
              <Typography variant="h4" className="text-black font-bold" style={{ fontFamily: '"Marcellus", serif' }}>
                Interview
                <span className="ml-2 text-blue-500">•</span>
              </Typography>
              <Typography variant="body1" className="text-gray-600 mt-2" style={{ fontFamily: '"PT Serif", serif'}}>
                Career advice and interview tips
              </Typography>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
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
        </div>

        {/* General Blogs Section at the Bottom */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="mb-6 border-b pb-4">
            <Typography variant="h4" className="text-black font-bold" style={{ fontFamily: '"Marcellus", serif' }}>
              Blog
              <span className="ml-2 text-purple-500">•</span>
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2" style={{ fontFamily: '"PT Serif", serif'}}>
              Recent updates and articles
            </Typography>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalBlogs.map(blog => (
              <div key={blog._id} className="flex flex-col gap-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Typography variant="h6" className="text-black font-semibold">
                  {blog.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {blog.author?.name || "Unknown Author"}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogListing;