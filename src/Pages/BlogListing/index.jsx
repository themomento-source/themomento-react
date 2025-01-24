import React from "react";
import BlogCard from "../../components/BlogCard";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const blogs = [
  {
    img: "https://source.unsplash.com/600x350/?nature",
    title: "Exploring the Beauty of Nature",
    author: "John Doe",
    intro: "Discover the breathtaking landscapes and wildlife of nature.",
  },
  {
    img: "https://source.unsplash.com/600x350/?technology",
    title: "The Future of AI and Technology",
    author: "Jane Smith",
    intro: "How artificial intelligence is shaping our world.",
  },
  {
    img: "https://source.unsplash.com/600x350/?travel",
    title: "Top 10 Destinations to Visit in 2025",
    author: "Alex Johnson",
    intro: "Explore the most stunning travel destinations for next year.",
  },
  {
    img: "https://source.unsplash.com/600x350/?food",
    title: "The Art of Cooking: A Guide to Gourmet Cuisine",
    author: "Michael Lee",
    intro: "Learn the secrets of fine dining and delicious recipes.",
  },
];

function BlogListing() {
  return (
    <section className="py-10 bg-gray-100">
      
      {/* Hero Section */}
      <div className="bg-white shadow-md py-10 text-center">
        <Typography variant="h3" className="text-gray-800 font-bold">
          Blog & Articles
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" className="flex justify-center mt-3">
          <Link underline="hover" color="inherit" href="/" onClick={handleClick}>
            Home
          </Link>
          <Typography color="text.primary">Blogs</Typography>
        </Breadcrumbs>
      </div>

      <div className="container mx-auto mt-8 flex flex-col lg:flex-row gap-8 px-4">
        
        {/* Blog Grid */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <BlogCard img={blog.img} title={blog.title} author={blog.author} intro={blog.intro} />
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white shadow-lg rounded-lg p-6">
          <Typography variant="h5" className="text-gray-700 font-semibold mb-4">
            Featured Posts
          </Typography>
          {blogs.slice(0, 2).map((blog, index) => (
            <div key={index} className="mb-4 flex items-center gap-4 border-b pb-3">
              <img src={blog.img} alt={blog.title} className="w-16 h-16 rounded-md object-cover" />
              <div>
                <Typography variant="h6" className="text-gray-800 font-semibold">
                  {blog.title}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {blog.author}
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
