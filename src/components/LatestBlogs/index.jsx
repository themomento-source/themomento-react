import React, { useState, useEffect } from 'react';
import { blogAPI } from '../../utils/api'; 
import BlogCard from '../BlogCard';

const LatestBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestBlogs = async () => {
            setLoading(true);
            try {
                // Add a cache-busting parameter to the query string
                const cacheBuster = `&_=${new Date().getTime()}`;
                const response = await blogAPI.getAll(`?sort=-createdAt&limit=2${cacheBuster}`);

                if (response?.success) {
                    setBlogs(response.data.blogs);
                    setError(null);
                } else {
                    // Handle cases where the response is not successful
                    setError(response?.message || 'Failed to load blog posts.');
                    setBlogs([]);
                }
            } catch (err) {
                setError(err.message || 'An unexpected error occurred.');
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestBlogs();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    if (blogs.length === 0) {
        return null; // Don't render the section if there are no blogs
    }

    return (
        <section className="bg-gray-50 py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight font-marcellus">
                        From Our Community
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-pt-serif">
                        Discover stories, tips, and inspiration from our talented photographers and industry experts.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 justify-center">
                    {blogs.map(blog => (
                        <BlogCard
                            key={blog._id}
                            _id={blog._id}
                            title={blog.title}
                            img={blog.image || 'https://res.cloudinary.com/dac4gsvh0/image/upload/v1683492329/TheMomento/Logo/1-6_pujzcv.png'}
                            author={blog.author}
                            categories={blog.categories?.map(c => c.name)}
                            createdAt={blog.createdAt}
                            intro={blog.excerpt || (blog.content && blog.content.substring(0, 150) + '...')}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestBlogs; 