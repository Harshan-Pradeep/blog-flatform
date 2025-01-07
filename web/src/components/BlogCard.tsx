import React, { useState } from 'react';
import { Calendar, Image as ImageIcon } from 'lucide-react';
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
    const [imageError, setImageError] = useState(false);

    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const stripHtml = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const contentPreview = stripHtml(blog.content).substring(0, 150) + '...';
    const titleText = stripHtml(blog.title);

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 
                 cursor-pointer overflow-hidden flex flex-col h-full border border-gray-200"
            >
                {blog.imageUrl && !imageError ? (
                    <div className="aspect-video w-full overflow-hidden">
                        <img
                            src={blog.imageUrl}
                            alt={titleText}
                            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                            onError={() => setImageError(true)}
                        />
                    </div>
                ) : (
                    <div className="aspect-video w-full bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                )}

                <div className="p-6">


                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 
                       transition-colors">
                        <div dangerouslySetInnerHTML={{ __html: blog.title }} />
                    </h2>

                    <p className="text-gray-600 line-clamp-3 mb-4">
                        {contentPreview}
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

                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                            <div dangerouslySetInnerHTML={{ __html: blog.title }} />
                        </DialogTitle>
                    </DialogHeader>

                    {blog.imageUrl && !imageError && (
                        <div className="mt-4 rounded-lg overflow-hidden">
                            <img
                                src={blog.imageUrl}
                                alt={titleText}
                                className="w-full h-auto object-cover rounded-lg"
                                onError={() => setImageError(true)}
                            />
                        </div>
                    )}

                    <div className="mt-6 prose prose-sm md:prose-base lg:prose-lg max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BlogCard;