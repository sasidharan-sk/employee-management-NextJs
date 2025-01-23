"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginFormSchema, loginSchema } from "@/forms-schema/login-schema";
import { signUpSchema, SignUpSchema } from "@/forms-schema/signup-schema";
import useSignup from "@/customhooks/authentication/useSignup";
import useLogin from "@/customhooks/authentication/useLogin";
import { z } from "zod";
import { toast } from "react-toastify";
import { Checkbox } from "../ui/checkbox";
import { redirect, useRouter } from "next/navigation";

type AuthFormProps = {
  mode: string;
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isSignUp = mode === "signup";

  const { mutate: mutateSignup } = useSignup();
  const { mutate: mutateLogin } = useLogin();

  const defaultValues = isSignUp
    ? { username: "", password: "", roles: [] }
    : { username: "", password: "" };

  const roles = [
    { id: "reader", label: "Reader" },
    { id: "writer", label: "Writer" },
  ];

  const form = useForm<SignUpSchema | LoginFormSchema>({
    reValidateMode: "onChange",
    resolver: zodResolver(isSignUp ? signUpSchema : loginSchema),
    defaultValues,
  });

  const onSubmit = (
    values: z.infer<typeof signUpSchema | typeof loginSchema>
  ) => {
    if (isSignUp) {
      mutateSignup(values, {
        onSuccess: (data) => {
          toast.success(`${data}, please login`);
        },
        onError: (error) => {
          toast.error(`${error.details?.error}: ${error.message}`);
        },
      });
    } else {
      mutateLogin(values, {
        onSuccess: (data) => {
          debugger;
          const token = data.jwtToken;
          localStorage.setItem("token", token);
          console.log("JwtToken : ", token);
          toast.success("Login successful", {
            onClose: () => {
              router.push("/");
            },
          });
        },
        onError: (error) => {
          console.log("Error :", error);
          toast.error(
            `${error.details?.message ? error.details.message : error.details}`
          );
        },
      });
    }
  };

  function handleNavigation(isSignUp: boolean) {
    if (isSignUp) {
      redirect("/login");
    } else {
      redirect("/signup");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isSignUp && (
              /* Roles */
              <FormField
                control={form.control}
                name="roles"
                render={() => (
                  <FormItem>
                    <FormLabel>Roles</FormLabel>
                    {roles.map((role) => (
                      <FormField
                        key={role.id}
                        control={form.control}
                        name="roles"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3">
                            <div className="flex flex-row items-center justify-between gap-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(role.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value || []),
                                          role.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== role.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {role.label}
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <button
            onClick={() => handleNavigation(isSignUp)}
            className="text-blue-600 hover:underline"
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
