import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { BlogFormData, BlogSchema } from "../schemas/blog.schema";
import { blogService } from '../services/blog.service';
import { Status } from '../types/status.enum';

const REDIRECT_DELAY = 1500;

const AddBlog = () => {
    const navigate = useNavigate();

    const [submission, setSubmission] = useState({
        isSuccess: false,
        error: '',
        countdown: REDIRECT_DELAY
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<BlogFormData>({
        resolver: zodResolver(BlogSchema),
    });

    useEffect(() => {
        let timer: number;
        if (submission.isSuccess && submission.countdown > 0) {
            timer = window.setTimeout(() => {
                setSubmission(prev => ({
                    ...prev,
                    countdown: prev.countdown - 1000
                }));
            }, 1000);
        } else if (submission.isSuccess && submission.countdown === 0) {
            navigate('/admin');
        }
        return () => clearTimeout(timer);
    }, [submission.isSuccess, submission.countdown, navigate]);

    const onSubmit = async (data: BlogFormData) => {
        try {
            await blogService.createBlog(data);
            setSubmission({
                isSuccess: true,
                error: '',
                countdown: REDIRECT_DELAY
            });
        } catch (err: any) {
            setSubmission(prev => ({
                ...prev,
                error: err.response?.data?.message || 'Failed to create blog post'
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 text-center">
                            Create New Blog Post
                        </h2>
                    </div>

                    <div className="px-6 py-6">
                        {submission.error && (
                            <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200">
                                <p className="text-red-700">{submission.error}</p>
                            </div>
                        )}

                        {submission.isSuccess ? (
                            <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200">
                                <p className="text-green-700">
                                    Blog post created successfully! Redirecting in {Math.ceil(submission.countdown / 1000)} seconds...
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        {...register('title')}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter blog title"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.title.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                        Content
                                    </label>
                                    <textarea
                                        {...register('content')}
                                        rows={8}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write your blog content here..."
                                    />
                                    {errors.content && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.content.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        {...register('status')}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select status</option>
                                        {Object.values(Status).map((status) => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.status && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.status.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/admin')}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium 
                                                 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                                                 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm 
                                                 font-medium text-white bg-blue-600 hover:bg-blue-700 
                                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                                                 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isSubmitting ? 'Creating...' : 'Create Post'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;