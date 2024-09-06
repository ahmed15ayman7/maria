import { z } from "zod";

export const newsSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
    content: z.string().min(10, { message: 'Content must be at least 10 characters long' }),
    author: z.string().min(2, { message: 'Author must be at least 2 characters long' }),
    category: z.string().min(3, { message: 'Category is required' }),
    imageUrl: z.string().optional(), // Allow for image URL to be optional until cropped
  });
  
 export type NewsFormInputs = z.infer<typeof newsSchema>;