import apiClient from "@/lib/api-client";
import { LoginDto } from "@movie-app/shared-types";

export interface LoginResponse {
  access_token: string;
}

export class AuthService {
  static async login(credentials: LoginDto): Promise<LoginResponse> {
    return await apiClient.post<LoginResponse>("/auth/login", credentials);
  }

  static setToken(token: string): void {
    localStorage.setItem("auth_token", token);
  }

  static getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  static removeToken(): void {
    localStorage.removeItem("auth_token");
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
