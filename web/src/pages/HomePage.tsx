import { FC } from 'react';
import { useBlogs } from "../hooks/useBlogs";
import { BlogCard } from '../components/BlogCard';

export const HomePage: FC = () => {
  const { blogs } = useBlogs();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Blog Posts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of articles about TypeScript, React, and modern web development.
          </p>
        </header>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No blog posts available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default HomePage;