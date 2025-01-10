import { z } from "zod";

export const addEmployeeSchema = z.object({
  firstName: z.string().min(4, {
    message: "Please enter your full name",
  }),
  lastName: z.string().min(2, {
    message: "Subject must be at least 2 characters",
  }),
  gender: z.string().min(4, {
    message: "Please select the gender",
  }),
  dateOfBirth: z.date().max(new Date(), {
    message: "Date of birth cannot be in future",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.number().min(10, {
    message: "Invalid email address",
  }),
  hireDate: z.date().max(new Date(), {
    message: "Hire date cannot be in future",
  }),
  departmentId: z.string().uuid({
    message: "Please select any department",
  }),
});

export type AddEmployeeSchema = z.infer<typeof addEmployeeSchema>;
