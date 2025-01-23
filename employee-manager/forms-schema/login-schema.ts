import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
