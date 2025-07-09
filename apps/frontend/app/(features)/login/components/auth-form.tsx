"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@movie-app/ui";
import { Input } from "@movie-app/ui";
import { Label } from "@movie-app/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@movie-app/ui";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { AuthService } from "../services/auth-service";
import type { LoginDto } from "@movie-app/shared-types";
import { LoginDtoSchema } from "@movie-app/shared-types";
import { useAuth } from "../../../../contexts/auth-context";
import { AppApiError } from "../../../../lib/api-error";

export function AuthForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginDto>({
    email: "demo@example.com",
    password: "password",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const validatedData = LoginDtoSchema.parse(formData);
      const response = await AuthService.login(validatedData);
      login(response.access_token);
      router.push("/");
    } catch (err: unknown) {
      console.error("Login error:", err);

      if (err && typeof err === "object" && "name" in err && err.name === "ZodError" && "errors" in err) {
        const validationErrors = (err.errors as Array<{ message: string }>).map((e) => e.message).join(", ");
        setError(validationErrors);
        return;
      }

      const appError = AppApiError.fromAxiosError(err);
      setError(appError.getUserFriendlyMessage());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="animate-slide-up border-slate-700/50 bg-slate-800/50 shadow-2xl backdrop-blur-xl">
      <CardHeader className="space-y-1 p-4 sm:p-6">
        <CardTitle className="text-xl text-white sm:text-2xl">Sign in to MovieDB</CardTitle>
        <CardDescription className="text-sm text-slate-400 sm:text-base">
          Enter your credentials to access your movie collection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0 sm:p-6">
        {error && (
          <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-red-400">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email
            </Label>
            <div className="group relative">
              <Mail className="absolute top-3 left-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-orange-500" />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="h-11 border-slate-600 bg-slate-700/50 pl-10 text-base text-white transition-all duration-300 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500/20 sm:h-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">
              Password
            </Label>
            <div className="group relative">
              <Lock className="absolute top-3 left-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-orange-500" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="h-11 border-slate-600 bg-slate-700/50 pr-10 pl-10 text-base text-white transition-all duration-300 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500/20 sm:h-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-slate-400 transition-colors hover:text-orange-500"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="h-11 w-full transform rounded-md bg-orange-600 px-4 py-2 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <div className="space-y-3">
          <div className="text-center">
            <a href="#" className="text-sm text-orange-500 transition-colors hover:text-orange-400">
              Forgot your password?
            </a>
          </div>
          <div className="rounded-md border border-blue-500/20 bg-blue-500/10 p-3 text-blue-400">
            <p className="mb-1 text-sm font-medium">Demo Credentials:</p>
            <p className="text-xs">Email: demo@example.com</p>
            <p className="text-xs">Password: password</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
