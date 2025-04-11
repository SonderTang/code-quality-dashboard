import apiClient, { ApiResponse, ApiError } from "./request";

interface UserData {
  username: string;
  password: string;
}

export const userLogin = (params: UserData) => {
  return apiClient.post<ApiResponse>("/api/auth/login", params);
}