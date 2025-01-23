import CreateUser from "@/services/authentication/create-user";
import { SignupRequest } from "@/types/authentication/signup-request";
import { ApiError } from "@/types/errors/common-errors";
import { useMutation } from "@tanstack/react-query";

export default function useSignup() {
  return useMutation<string, ApiError, SignupRequest>({
    mutationFn: (body) => CreateUser(body),
  });
}
