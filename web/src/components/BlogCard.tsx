import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/dialog';
import type { Blog } from '../types/blog.types';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 
                 cursor-pointer overflow-hidden flex flex-col h-full border border-gray-200"
      >
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs ${
              blog.status === 'published' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {blog.status}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 
                       transition-colors">
            {blog.title}
          </h2>

          <p className="text-gray-600 line-clamp-3 mb-4">
            {blog.content}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <button 
              className="text-blue-600 hover:text-blue-800 font-medium"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
            >
              Read more →
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                blog.status === 'published' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {blog.status}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {blog.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-6">
            <p className="text-gray-600 whitespace-pre-wrap">
              {blog.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogCard;