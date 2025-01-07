import { useState } from 'react';
import AddBlogForm from "../components/AddBlogForm";
import { useBlogs } from "../hooks/useBlogs";
import type { Blog } from '../types/blog.types';
import type { BlogFormData } from '../schemas/blog.schema';
import { PlusCircle } from 'lucide-react';
import BlogsGrid from '../components/BlogsGrid';
import { Card, CardContent } from '../components/card';

const DashboardPage = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [addError, setAddError] = useState<string>('');

    const {
        blogs,
        isLoading,
        error,
        editingId,
        editedBlog,
        createBlog,
        handleEdit,
        handleSave,
        handleCancel,
        handleDelete,
        handleInputChange,
    } = useBlogs();

    const handleDeleteClick = async (blog: Blog) => {
        const confirmed = window.confirm('Are you sure you want to delete this blog post?');
        if (confirmed) {
            await handleDelete(blog.id);
        }
    };

    const handleSaveClick = async () => {
        const success = await handleSave();
        if (success) {
            console.log('Blog saved successfully');
        }
    };

    const handleAddSubmit = async (data: BlogFormData) => {
        try {
            await createBlog.mutateAsync(data);
            setShowAddForm(false);
            setAddError('');
        } catch (err: any) {
            setAddError(err.response?.data?.message || 'Failed to create blog post');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
                <div className="text-xl">Loading blog posts...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
                <div className="text-xl text-red-600">Error: {error.message}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
                            <p className="mt-1 text-sm text-gray-500">Manage your blog content</p>
                        </div>
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white 
                                     rounded-lg hover:bg-blue-700 transition-colors focus:outline-none 
                                     focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
                        >
                            <PlusCircle className="w-5 h-5 mr-2" />
                            {showAddForm ? 'Cancel' : 'New Post'}
                        </button>
                    </div>
                </div>

                {showAddForm ? (
                    <Card className="mb-8">
                        <CardContent className="p-6">
                            <AddBlogForm
                                onSubmit={handleAddSubmit}
                                onCancel={() => setShowAddForm(false)}
                                isSubmitting={createBlog.isPending}
                                error={addError}
                            />
                        </CardContent>
                    </Card>
                ) : (
                    <BlogsGrid
                        blogs={blogs}
                        editingId={editingId}
                        editedBlog={editedBlog}
                        onEdit={handleEdit}
                        onSave={handleSaveClick}
                        onCancel={handleCancel}
                        onDelete={handleDeleteClick}
                        onInputChange={handleInputChange}
                    />
                )}
            </div>
        </div>
    );
};

export default DashboardPage;