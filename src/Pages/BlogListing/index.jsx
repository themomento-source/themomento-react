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
    <section className="py-10 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-amber-200 mb-5 shadow-md py-10 text-center">
        <Typography variant="h3" className="text-black font-bold" style={{ fontFamily: '"Marcellus", serif' }}>
          Community
        </Typography>
      </div>

      <div className="container mx-auto mt-8 px-4 ">
        <div className="flex flex-col lg:flex-row gap-8  ">
          {/* Learning Section */}
          <div className="flex-1 bg-white shadow-lg p-6">
            <div className="mb-6 text-center ">
              <Typography variant="h4" className="text-black font-marcellus font-bold mb-2">
                Learning
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Educational content and tutorials
              </Typography>
            </div>
            
            <div className="space-y-6">
              {learningBlogs.slice(0, 2).map(blog => (
                <BlogCard
                  key={blog._id}
                  _id={blog._id}
                  img={blog.image}
                  title={blog.title}
                  author={blog.author}
                  intro={blog.description}
                  categories={blog.categories}
                  createdAt={blog.createdAt}
                  className="hover:shadow-lg transition-all duration-300"
                />
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link 
                to="/learning" 
                className="inline-block bg-primary text-gray-800 px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                View All Learning →
              </Link>
            </div>
          </div>

          {/* Interview Section */}
          <div className="flex-1 bg-white shadow-lg p-6">
            <div className="mb-6 text-center">
              <Typography variant="h4" className="text-black font-marcellus font-bold mb-2">
                Interview
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Career advice and interview tips
              </Typography>
            </div>
            
            <div className="space-y-6">
              {interviewBlogs.slice(0, 2).map(blog => (
                <BlogCard
                  key={blog._id}
                  _id={blog._id}
                  img={blog.image}
                  title={blog.title}
                  author={blog.author}
                  intro={blog.description}
                  categories={blog.categories}
                  createdAt={blog.createdAt}
                  className="hover:shadow-lg transition-all duration-300"
                />
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link 
                to="/interview" 
                className="inline-block bg-primary text-gray-800 px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                View All Interviews →
              </Link>
            </div>
          </div>

          {/* General Blogs Section */}
          <div className="flex-1 bg-white shadow-lg p-6">
            <div className="mb-6 text-center">
              <Typography variant="h4" className="text-black font-marcellus font-bold mb-2">
                Blog
              </Typography>
              <Typography variant="body-1" className="text-gray-600">
                Recent updates and articles
              </Typography>
            </div>
            
            <div className="space-y-6">
              {generalBlogs.slice(0, 2).map(blog => (
                <BlogCard
                  key={blog._id}
                  _id={blog._id}
                  img={blog.image}
                  title={blog.title}
                  author={blog.author}
                  intro={blog.description}
                  categories={blog.categories}
                  createdAt={blog.createdAt}
                  className="hover:shadow-lg transition-all duration-300"
                />
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link 
                to="/general-blog" 
                className="inline-block bg-primary text-gray-800 px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                View All Blogs →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogListing