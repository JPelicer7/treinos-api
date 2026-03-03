import z from "zod";

import { weekDay } from "../generated/prisma/enums.js";

export const ErrorSchema = z.object({
  error: z.string(),
  code: z.string(),
});

export const WorkoutPlanSchema = z.object({
  id: z.uuid(),
  name: z.string().trim().min(1, {
    message: "Name is required",
  }),
  workoutDays: z.array(
    z.object({
      name: z.string().trim().min(1), //superiores/ inferiores/ etc
      weekDay: z.enum(weekDay),
      isRest: z.boolean().default(false),
      coverImageUrl: z.string().url().optional(),
      estimatedDurationInSeconds: z.number().min(1),
      exercises: z.array(
        z.object({
          order: z.number().min(0),
          name: z.string().trim().min(1),
          sets: z.number().min(1),
          reps: z.number().min(1),
          restTimeInSeconds: z.number().min(1),
        }),
      ),
    }),
  ),
});
