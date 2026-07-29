import { request } from "./client";
import type { Profile } from "../types/profile";

type ProfileResponse = {
  profile: Profile;
};

export async function getProfile(
  username: string
): Promise<ProfileResponse> {
  return request<ProfileResponse>(`/profiles/${username}`);
}

export async function followProfile(
  username: string
): Promise<ProfileResponse> {
  return request<ProfileResponse>(`/profiles/${username}/follow`, {
    method: "POST",
  });
}

export async function unfollowProfile(
  username: string
): Promise<ProfileResponse> {
  return request<ProfileResponse>(`/profiles/${username}/follow`, {
    method: "DELETE",
  });
}