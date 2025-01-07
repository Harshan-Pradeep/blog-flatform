import React from 'react';
import { useBlogs } from "../hooks/useBlogs";
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer ';
import Navbar from '../components/Navbar ';

const HomePage: React.FC = () => {
  const { blogs, isLoading, error } = useBlogs();

  const publishedBlogs = blogs.filter(blog => blog.status === 'published');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-red-600">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Blog Posts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of articles about TypeScript, React, and modern web development.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {publishedBlogs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">
              No blog posts available at the moment.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;