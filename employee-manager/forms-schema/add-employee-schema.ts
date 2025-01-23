import { z } from "zod";

export const addEmployeeSchema = z.object({
  firstName: z.string().min(4, {
    message: "First name must be atleast 4 characters",
  }),
  lastName: z
    .string()
    .max(20, {
      message: "Last name must not exceed 20 characters",
    })
    .min(2, {
      message: "Last name must be at least 2 characters",
    }),
  gender: z.string().min(4, {
    message: "Please select the gender",
  }),
  dateOfBirth: z.date().max(new Date(), {
    message: "Date of birth cannot be in future",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, {
    message: "Must be atleast 10 numbers",
  }),
  hireDate: z.date().max(new Date(), {
    message: "Hire date cannot be in future",
  }),
  departmentId: z.string().uuid({
    message: "Please select any department",
  }),
});

export type AddEmployeeSchema = z.infer<typeof addEmployeeSchema>;
