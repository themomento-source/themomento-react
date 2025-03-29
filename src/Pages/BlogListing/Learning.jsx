// Learning.jsx
import React, { useEffect, useState } from 'react';
import { blogAPI } from '../../utils/api';
import BlogCard from '../../components/BlogCard';
import CircularProgress from '@mui/material/CircularProgress';

function Learning() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogAPI.getAll("?category=Learning");
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

  if (loading) return <div className="text-center py-8"><CircularProgress /></div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Learning Resources</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
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
      </div>
    </section>
  );
}

export default Learning;