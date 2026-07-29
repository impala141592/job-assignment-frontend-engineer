import { request } from "./client";
import type { User } from "../types/user";

type LoginCredentials = {
  email: string;
  password: string;
};

type UserResponse = {
  user: User;
};

export async function login(
  credentials: LoginCredentials
): Promise<UserResponse> {
  const response = await request<UserResponse>("/users/login", {
    method: "POST",
    body: {
      user: credentials,
    },
  });

  localStorage.setItem("token", response.user.token);

  return response;
}

export async function getCurrentUser(): Promise<UserResponse> {
  return request<UserResponse>("/user");
}

export function logout(): void {
  localStorage.removeItem("token");
}