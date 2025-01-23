import AuthenticateUser from "@/services/authentication/login-user";
import { LoginResponse } from "@/types/authentication/login-response";
import { LoginRequest } from "@/types/authentication/signup-request";
import { ApiError } from "@/types/errors/common-errors";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationFn: (body) => AuthenticateUser(body),
  });
}
