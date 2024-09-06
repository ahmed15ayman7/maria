import { z } from "zod";

export const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export type FeedbackFormInputs = z.infer<typeof feedbackSchema>;
