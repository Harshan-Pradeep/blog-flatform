import React from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import type { Blog } from '../types/blog.types';
import { Card, CardContent } from './card';

type BlogsGridProps = {
    blogs: Blog[];
    editingId: number | null;
    editedBlog: Blog | null;
    onEdit: (blog: Blog) => void;
    onSave: () => void;
    onCancel: () => void;
    onDelete: (blog: Blog) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: keyof Blog) => void;
};

const BlogsGrid: React.FC<BlogsGridProps> = ({
    blogs,
    editingId,
    editedBlog,
    onEdit,
    onSave,
    onCancel,
    onDelete,
    onInputChange,
}) => {
    const renderEditableField = (
        blog: Blog,
        field: keyof Blog,
        type: 'text' | 'textarea' | 'select' = 'text'
    ) => {
        if (editingId !== blog.id) {
            if (field === 'content') {
                return blog[field].substring(0, 150) + (blog[field].length > 150 ? '...' : '');
            }
            return blog[field];
        }

        if (!editedBlog) return null;

        if (field === 'status') {
            return (
                <select
                    value={editedBlog.status}
                    onChange={(e) => onInputChange(e, 'status')}
                    className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 
                             focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
            );
        }

        if (field === 'content') {
            return (
                <textarea
                    value={editedBlog[field]}
                    onChange={(e) => onInputChange(e, field)}
                    className="w-full border rounded-lg px-3 py-2 min-h-[120px] focus:ring-2 
                             focus:ring-blue-500 focus:border-blue-500"
                />
            );
        }

        return (
            <input
                type={type}
                value={editedBlog[field]}
                onChange={(e) => onInputChange(e, field)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500"
            />
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {renderEditableField(blog, 'title')}
                                    </h3>
                                    <div className="flex gap-2">
                                        {editingId === blog.id ? (
                                            <>
                                                <button
                                                    onClick={onSave}
                                                    className="p-1 text-green-600 hover:text-green-800 
                                                             transition-colors"
                                                    title="Save changes"
                                                >
                                                    <Check className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={onCancel}
                                                    className="p-1 text-gray-600 hover:text-gray-800 
                                                             transition-colors"
                                                    title="Cancel editing"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => onEdit(blog)}
                                                    className="p-1 text-blue-600 hover:text-blue-800 
                                                             transition-colors"
                                                    title="Edit post"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(blog)}
                                                    className="p-1 text-red-600 hover:text-red-800 
                                                             transition-colors"
                                                    title="Delete post"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${blog.status === 'published'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {renderEditableField(blog, 'status')}
                                    </span>
                                    <span>·</span>
                                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="text-gray-600">
                                {renderEditableField(blog, 'content')}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default BlogsGrid;