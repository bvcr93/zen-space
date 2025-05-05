import { z } from "zod";

export const newMeditationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required").optional(),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  type: z.enum(["guided", "unguided"]),
  date: z.date(),
});

export type NewMeditation = z.infer<typeof newMeditationSchema>;
