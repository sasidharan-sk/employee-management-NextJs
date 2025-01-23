import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  roles: z.array(z.string()).optional(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
