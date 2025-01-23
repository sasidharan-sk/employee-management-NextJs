import { ENDPOINTS } from "@/config/apiconfig";
import { LoginRequest } from "@/types/authentication/signup-request";
import axiosInstance from "@/utils/axiosInstance";

export default async function AuthenticateUser(
  body: LoginRequest
): Promise<string> {
  const response = await axiosInstance.post(ENDPOINTS.LOGIN, body);
  return response.data;
}
