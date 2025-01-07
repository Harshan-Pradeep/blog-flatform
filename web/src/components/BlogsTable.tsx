import React from 'react';
import { Blog } from '../types/blog.types';

type BlogsTableProps = {
    blogs: Blog[];
    editingId: number | null;
    editedBlog: Blog | null;
    onEdit: (blog: Blog) => void;
    onSave: () => void;
    onCancel: () => void;
    onDelete: (blog: Blog) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: keyof Blog) => void;
};

const BlogsTable: React.FC<BlogsTableProps> = ({
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
                return blog[field].substring(0, 100) + (blog[field].length > 100 ? '...' : '');
            }
            return blog[field];
        }

        if (!editedBlog) return null;

        if (field === 'status') {
            return (
                <select
                    value={editedBlog.status}
                    onChange={(e) => onInputChange(e, 'status')}
                    className="w-full border rounded px-2 py-1"
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
                    className="w-full border rounded px-2 py-1 min-h-[100px]"
                />
            );
        }

        return (
            <input
                type={type}
                value={editedBlog[field]}
                onChange={(e) => onInputChange(e, field)}
                className="w-full border rounded px-2 py-1"
            />
        );
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
            <table className="w-full text-sm text-left text-gray-800">
                <thead className="text-gray-800 bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">Title</th>
                        <th className="px-6 py-3">Content</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Created At</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-gray-50 border-t">
                            <td className="px-6 py-4">{renderEditableField(blog, 'title')}</td>
                            <td className="px-6 py-4">{renderEditableField(blog, 'content', 'textarea')}</td>
                            <td className="px-6 py-4">{renderEditableField(blog, 'status', 'select')}</td>
                            <td className="px-6 py-4">
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex space-x-4">
                                    {editingId === blog.id ? (
                                        <>
                                            <button
                                                onClick={onSave}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={onCancel}
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button 
                                            onClick={() => onEdit(blog)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => onDelete(blog)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogsTable;