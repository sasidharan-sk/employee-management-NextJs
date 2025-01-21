import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FileUpload,
  ImageUploadRequest,
} from "@/types/employee/upload-image-request";
import UploadEmployeeImage from "@/services/employee/upload-employee-image";
import { getAllEmployeeQueryKey } from "./useFetchAllEmployees";

export default function useEmployeeImageUpload() {
  const queryClient = useQueryClient();
  return useMutation<FileUpload, Error, ImageUploadRequest>({
    mutationFn: (body) => UploadEmployeeImage(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getAllEmployeeQueryKey] });
    },
  });
}
