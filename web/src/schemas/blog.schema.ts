import { z } from 'zod';
import { Status } from '../types/status.enum';

export const BlogSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  content: z.string().min(15, 'Content is required'),
  status: z.enum(Object.values(Status) as [Status, ...Status[]], {
    required_error: "Blog status is required",
  }),
  image: z.any()
        .optional()
        .refine((file) => !file || (file instanceof File), {
            message: 'Image must be a file',
        })
        .refine((file) => {
            if (!file) return true;
            return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
        }, 'Only .jpg, .jpeg, .png and .gif formats are supported.')
        .refine((file) => {
            if (!file) return true;
            return file.size <= 5 * 1024 * 1024;
        }, 'Image must be less than 5MB'),
});


export type BlogFormData = z.infer<typeof BlogSchema>;