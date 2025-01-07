import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Blog } from '../types/blog.types';
import { ApiResponse, blogService } from '../services/blog.service';
import { BlogFormData } from '../schemas/blog.schema';

export const useBlogs = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedBlog, setEditedBlog] = useState<Blog | null>(null);

  const { data, isLoading, error } = useQuery<ApiResponse<Blog[]>>({
    queryKey: ['blogs'],
    queryFn: blogService.getBlogs
  });

  const createBlog = useMutation({
    mutationFn: (data: BlogFormData) => blogService.createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const updateBlog = useMutation({
    mutationFn: (data: Partial<Blog>) => {
      const { id, ...updateData } = data;
      return blogService.updateBlog(id!, updateData as BlogFormData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setEditingId(null);
      setEditedBlog(null);
    },
  });

  const deleteBlog = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setEditedBlog(blog);
  };

  const handleSave = async () => {
    if (editedBlog) {
      try {
        await updateBlog.mutateAsync(editedBlog);
        return true;
      } catch (error) {
        console.error('Error updating blog:', error);
        return false;
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedBlog(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBlog.mutateAsync(id);
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: keyof Blog
  ) => {
    if (editedBlog) {
      setEditedBlog({
        ...editedBlog,
        [field]: e.target.value,
      });
    }
  };

  return {
    blogs: data?.data ?? [],
        isLoading,
        error,
        editingId,
        editedBlog,
        createBlog,
        updateBlog,
        deleteBlog,
        handleEdit,
        handleSave,
        handleCancel,
        handleDelete,
        handleInputChange,
  };
}