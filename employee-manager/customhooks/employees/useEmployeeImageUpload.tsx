import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FileUpload,
  ImageUploadRequest,
} from "@/types/employee/upload-image-request";
import { API_BASE_URL, ENDPOINTS } from "@/config/apiconfig";
import UploadEmployeeImage from "@/services/employee/upload-employee-image";

export const getEmployeeImageQueryKey = `${API_BASE_URL}${ENDPOINTS.UPLOAD_IMAGE}`;
export default function useEmployeeImageUpload() {
  const queryClient = useQueryClient();
  return useMutation<FileUpload, Error, ImageUploadRequest>({
    mutationFn: (body) => UploadEmployeeImage(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getEmployeeImageQueryKey] });
    },
  });
}
