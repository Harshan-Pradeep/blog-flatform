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
        const response = await api.post<Blog>('/blogs', blog);
        return response.data;
    },

    updateBlog: async (id: number, blog: BlogFormData) => {
        const filteredData: BlogFormData = {
            title: blog.title,
            content: blog.content,
            status: blog.status,
        };

        const response = await api.put<Blog>(`/blogs/${id}`,filteredData);
        return response.data;
    },

    deleteBlog: async (id: number) => {
        await api.delete(`/blogs/${id}`);
    }

}