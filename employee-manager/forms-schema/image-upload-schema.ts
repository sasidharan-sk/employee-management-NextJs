import { z } from "zod";

export const MAX_FILE_SIZE = 10485760; // 10 MB in bytes

export const imageUploadSchema = z.object({
  EmpId: z.string().uuid(),
  File: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must not exceed 10 MB.",
    })
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "Only JPG, JPEG, or PNG files are allowed.",
    }),
  FileName: z.string().min(1, "File name is required"),
  FileDescription: z.string().optional(),
});

export type AddEmployeeImageSchema = z.infer<typeof imageUploadSchema>;
