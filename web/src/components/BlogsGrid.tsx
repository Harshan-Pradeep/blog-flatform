import React from 'react';
import { Edit2, Trash2, Check, X, ImageIcon } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
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
    onInputChange: {
        richText: (field: keyof Blog, value: string) => void;
        regular: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: keyof Blog) => void;
    };
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
        field: keyof Blog
    ) => {
        const displayBlog = (editingId === blog.id && editedBlog) ? editedBlog : blog;

        if (editingId !== blog.id) {
            if (field === 'content') {
                return (
                    <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ 
                            __html: displayBlog[field].length > 300 
                                ? displayBlog[field].substring(0, 300) + '...' 
                                : displayBlog[field] 
                        }} 
                    />
                );
            }
            if (field === 'title') {
                return (
                    <div 
                        className="prose max-w-none" 
                        dangerouslySetInnerHTML={{ __html: displayBlog[field] }} 
                    />
                );
            }
            return displayBlog[field];
        }

        if (!editedBlog) return null;

        if (field === 'status') {
            return (
                <select
                    value={editedBlog.status}
                    onChange={(e) => onInputChange.regular(e, 'status')}
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
                <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    value={editedBlog[field]}
                    onEditorChange={(content) => onInputChange.richText(field, content)}
                    init={{
                        height: 300,
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; font-size: 16px; }',
                    }}
                />
            );
        }

        if (field === 'title') {
            return (
                <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    value={editedBlog[field]}
                    onEditorChange={(content) => onInputChange.richText(field, content)}
                    init={{
                        height: 100,
                        menubar: false,
                        plugins: ['advlist', 'lists', 'link', 'paste'],
                        toolbar: 'undo redo | formatselect | bold italic',
                        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; font-size: 16px; }',
                    }}
                />
            );
        }

        return null;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        {blog.imageUrl ? (
                            <div className="aspect-video w-full overflow-hidden mb-4">
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="aspect-video w-full bg-gray-100 flex items-center justify-center mb-4">
                                <ImageIcon className="w-8 h-8 text-gray-400" />
                            </div>
                        )}

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
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        (editingId === blog.id && editedBlog ? editedBlog.status : blog.status) === 'published'
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