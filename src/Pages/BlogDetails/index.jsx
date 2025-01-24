import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaRegCommentAlt, FaRegCalendarAlt } from "react-icons/fa";

const blog = {
  id: 1,
  title: "AI is Reshaping Journalism: What It Means for the Future",
  author: "Jane Williams",
  authorImg: "https://source.unsplash.com/100x100/?woman",
  date: "January 24, 2025",
  category: "Technology & Media",
  tags: ["AI", "Journalism", "Tech"],
  coverImg: "https://source.unsplash.com/1200x600/?newsroom",
  content: `
    Artificial Intelligence (AI) is transforming the world of journalism. From automated 
    news writing to real-time data analysis, AI is both a powerful tool and a potential 
    challenge for traditional media outlets.
    
    ## The Role of AI in Journalism
    AI-generated articles are already being used by major news platforms. The Associated 
    Press, for example, uses AI to generate business reports.

    ## Ethical Challenges
    While AI can speed up reporting, concerns about misinformation and bias are growing. 
    Can AI truly replace human journalists?

    ## The Road Ahead
    Newsrooms must balance AI automation with ethical journalism. The future of media 
    will depend on how organizations adapt to these new tools.
  `,
};

const trendingNews = [
  { id: 1, title: "Meta Launches AI News Assistant" },
  { id: 2, title: "Tesla’s New Robot Outperforms Expectations" },
  { id: 3, title: "How Chatbots Are Taking Over Customer Support" },
  { id: 4, title: "The Rise of AI-Generated Music and Art" },
];

function BlogDetails() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 bg-white p-8 shadow-md rounded-lg">
          {/* Headline */}
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">{blog.title}</h1>

          {/* Author & Date */}
          <div className="flex items-center gap-4 mt-4 text-gray-600">
            <img src={blog.authorImg} alt={blog.author} className="w-12 h-12 rounded-full" />
            <div>
              <p className="text-lg font-semibold">{blog.author}</p>
              <p className="flex items-center gap-2 text-sm">
                <FaRegCalendarAlt /> {blog.date}
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="w-full mt-6 rounded-lg overflow-hidden">
            <img src={blog.coverImg} alt={blog.title} className="w-full h-[450px] object-cover" />
          </div>

          {/* Blog Content */}
          <article className="mt-6 text-lg text-gray-800 leading-relaxed">
            {blog.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-6">{paragraph}</p>
            ))}
          </article>

          {/* Tags */}
          <div className="mt-6 flex gap-3">
            {blog.tags.map((tag, index) => (
              <span key={index} className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-full uppercase">
                {tag}
              </span>
            ))}
          </div>

          {/* Social Sharing */}
          <div className="mt-6 flex gap-5">
            <span className="text-gray-600 text-lg">Share:</span>
            <a href="#" className="text-blue-600 text-xl hover:text-blue-800">
              <FaFacebookF />
            </a>
            <a href="#" className="text-blue-400 text-xl hover:text-blue-600">
              <FaTwitter />
            </a>
            <a href="#" className="text-blue-700 text-xl hover:text-blue-900">
              <FaLinkedinIn />
            </a>
          </div>

          {/* Comments Section */}
          <div className="mt-12 border-t pt-6">
            <h3 className="text-2xl font-semibold mb-4">Comments</h3>
            <div className="flex items-center gap-4 mb-4">
              <FaRegCommentAlt className="text-gray-600 text-2xl" />
              <p className="text-gray-700 text-lg">No comments yet. Be the first to share your thoughts.</p>
            </div>
            <textarea className="w-full p-4 border rounded-lg" placeholder="Write a comment..."></textarea>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800">Post Comment</button>
          </div>
        </div>

        {/* Sidebar: Trending News */}
        <aside className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Trending Now</h3>
          <ul>
            {trendingNews.map((news) => (
              <li key={news.id} className="mb-4">
                <a href="#" className="text-gray-800 font-medium hover:text-blue-600">
                  {news.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

export default BlogDetails;
