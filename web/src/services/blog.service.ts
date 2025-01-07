import api from "./api";
import { Blog, BlogFormData } from "../types/blog.types";

export interface ApiResponse<T> {
    data: T;
    metadata: {
        timestamp: string;
        path: string;
        statusCode: number;
    };
}

export const blogService = {
    getBlogs: async () => {
        const response = await api.get<ApiResponse<Blog[]>>('/blogs');
        return response.data;
    },

    getOneBlog: async (id: number) => {
        const response = await api.get<ApiResponse<Blog>>(`/blogs/${id}`);
        return response.data;

    },

    createBlog: async (blog: BlogFormData) => {
        const formData = new FormData();
        formData.append('title', blog.title);
        formData.append('content', blog.content);
        formData.append('status', blog.status);
        if (blog.image instanceof File) {
            formData.append('image', blog.image);
        }
        const response = await api.post<Blog>('/blogs', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateBlog: async (id: number, blog: BlogFormData) => {
        const formData = new FormData();
        formData.append('title', blog.title);
        formData.append('content', blog.content);
        formData.append('status', blog.status);
        if (blog.image instanceof File) {
            formData.append('image', blog.image);
        }
        const response = await api.put<Blog>(`/blogs/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteBlog: async (id: number) => {
        await api.delete(`/blogs/${id}`);
    }

}