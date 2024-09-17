import { z } from "zod";

export const adSchema = z.object({
    imageUrl: z.string().url({ message: 'Invalid URL' }).optional(),
    redirectUrl: z.string().url({ message: 'Invalid URL' }),
  });
  
export  type AdFormData = z.infer<typeof adSchema>;