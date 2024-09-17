import { z } from "zod";

export const aboutSchema = z.object({
    title: z.string().min(10, { message: 'Title must be at least 10 characters long' }),
    details: z.string().min(20, { message: 'details must be at least 20 characters long' }),
    imageUrl: z.string().url({ message: 'اختر الصوره' }), // Allow for image URL to be optional until cropped
  });
  
 export type AboutFormInputs = z.infer<typeof aboutSchema>;
 