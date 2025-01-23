import AuthenticateUser from "@/services/authentication/login-user";
import { LoginRequest } from "@/types/authentication/signup-request";
import { ApiError } from "@/types/errors/common-errors";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  return useMutation<string, ApiError, LoginRequest>({
    mutationFn: (body) => AuthenticateUser(body),
  });
}
