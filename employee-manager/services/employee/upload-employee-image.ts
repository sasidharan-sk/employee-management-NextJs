import { ENDPOINTS } from "@/config/apiconfig";
import {
  FileUpload,
  ImageUploadRequest,
} from "@/types/employee/upload-image-request";
import axiosInstance from "@/utils/axiosInstance";

export default async function UploadEmployeeImage(
  body: ImageUploadRequest
): Promise<FileUpload> {
  const response = await axiosInstance.post(ENDPOINTS.UPLOAD_IMAGE, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
