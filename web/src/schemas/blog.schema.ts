import { z } from 'zod';
import { Status } from '../types/status.enum';

export const BlogSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  content: z.string().min(15, 'Content is required'),
  status: z.enum(Object.values(Status) as [Status, ...Status[]], {
    required_error: "Blog status is required",
  }),
});

export type BlogFormData = z.infer<typeof BlogSchema>;