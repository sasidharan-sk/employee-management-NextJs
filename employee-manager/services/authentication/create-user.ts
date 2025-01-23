import { ENDPOINTS } from "@/config/apiconfig";
import { SignupRequest } from "@/types/authentication/signup-request";
import axiosInstance from "@/utils/axiosInstance";

export default async function CreateUser(body: SignupRequest): Promise<string> {
  const response = await axiosInstance.post(ENDPOINTS.REGISTER, body);
  return response.data;
}
