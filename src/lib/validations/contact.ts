import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(3, "Subject should be at least 3 characters.")
    .max(150, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(20, "Message should be at least 20 characters.")
    .max(2000, "Message is too long."),
  // Honeypot field — real users never fill this in.
  company: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
