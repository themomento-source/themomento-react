import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { blogAPI } from "../../utils/api";
import { Link } from "react-router-dom";

function BlogListing() {
  const [learningBlogs, setLearningBlogs] = useState([]);
  const [interviewBlogs, setInterviewBlogs] = useState([]);
  const [generalBlogs, setGeneralBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const [learningRes, interviewRes, generalRes] = await Promise.all([
          blogAPI.getAll("?category=Learning&limit=3"),
          blogAPI.getAll("?category=Interviews&limit=3"),
          blogAPI.getAll("?category=Blog&limit=3"),
        ]);

        if (learningRes?.success) setLearningBlogs(learningRes.data.blogs);
        if (interviewRes?.success) setInterviewBlogs(interviewRes.data.blogs);
        if (generalRes?.success) setGeneralBlogs(generalRes.data.blogs);

        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to load blogs");
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
    <section className="py-10 bg-gradient-to-r from-gray-900 to-black">
      {/* Hero Section */}
      <div className="bg-amber-200 mb-5 shadow-md py-10 text-center">
        <Typography variant="h3" className="text-black font-bold" style={{ fontFamily: '"Marcellus", serif' }}>
          Community
        </Typography>
      </div>

      <div className="container mx-auto mt-8 flex flex-col gap-8 px-4">
        {/* Learning Section */}
        <div className="bg-white shadow-lg p-6">
          <div className="mb-6 border-b pb-4 text-center">
            <Typography variant="h4" className="text-black font-serif font-bold">
              Learning
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              Educational content and tutorials
            </Typography>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
            {learningBlogs.map(blog => (
              <BlogCard
                key={blog._id}
                _id={blog._id}
                img={blog.image}
                title={blog.title}
                author={blog.author}
                intro={blog.description}
                categories={blog.categories}
                createdAt={blog.createdAt}
              />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/learning" className="text-amber-600 hover:text-amber-700">
              View All →
            </Link>
          </div>
        </div>

        {/* Interviews Section */}
        <div className="bg-white shadow-lg p-6">
          <div className="mb-6 border-b pb-4 text-center">
            <Typography variant="h4" className="text-black font-serif font-bold">
              Interview
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              Career advice and interview tips
            </Typography>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
            {interviewBlogs.map(blog => (
              <BlogCard
                key={blog._id}
                _id={blog._id}
                img={blog.image}
                title={blog.title}
                author={blog.author}
                intro={blog.description}
                categories={blog.categories}
                createdAt={blog.createdAt}
              />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/interview" className="text-amber-600 hover:text-amber-700">
              View All →
            </Link>
          </div>
        </div>

        {/* General Blogs Section */}
        <div className="bg-white shadow-lg p-6">
          <div className="mb-6 border-b pb-4 text-center">
            <Typography variant="h4" className="text-black font-serif font-bold">
              Blog
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              Recent updates and articles
            </Typography>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalBlogs.map(blog => (
              <BlogCard
                key={blog._id}
                _id={blog._id}
                img={blog.image}
                title={blog.title}
                author={blog.author}
                intro={blog.description}
                categories={blog.categories}
                createdAt={blog.createdAt}
              />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/general-blog" className="text-amber-600 hover:text-amber-700">
              View All →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogListing;
