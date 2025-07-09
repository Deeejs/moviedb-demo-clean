import apiClient from "@/lib/api-client";
import type { Movie, CreateMovieDto, UpdateMovieDto, PaginatedResponse, SearchParams } from "@movie-app/shared-types";
import { MovieSchema } from "@movie-app/shared-types";
import { z } from "zod";

export const movieService = {
  async getAll(page: number = 1, limit: number = 12): Promise<PaginatedResponse<Movie>> {
    return apiClient.get<PaginatedResponse<Movie>>(`/movies?page=${page}&limit=${limit}`);
  },

  async getById(id: string): Promise<Movie> {
    try {
      const response = await apiClient.get<Movie>(`/movies/${id}`);
      return MovieSchema.parse(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.warn("Movie validation failed:", error.errors);

        return apiClient.get<Movie>(`/movies/${id}`);
      }
      throw error;
    }
  },

  async getByActorId(actorId: string): Promise<Movie[]> {
    try {
      const response = await apiClient.get<Movie[]>(`/movies/by-actor/${actorId}`);
      return z.array(MovieSchema).parse(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.warn("Movies array validation failed:", error.errors);

        return apiClient.get<Movie[]>(`/movies/by-actor/${actorId}`);
      }
      throw error;
    }
  },

  async create(data: CreateMovieDto): Promise<Movie> {
    return apiClient.post<Movie>("/movies", data);
  },

  async update(id: string, data: UpdateMovieDto): Promise<Movie> {
    return apiClient.patch<Movie>(`/movies/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/movies/${id}`);
  },

  async search(params: SearchParams): Promise<Movie[]> {
    const searchParams = new URLSearchParams();
    if (params.query) searchParams.append("q", params.query);

    try {
      const response = await apiClient.get<Movie[]>(`/movies?${searchParams.toString()}`);
      return z.array(MovieSchema).parse(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.warn("Movie search validation failed:", error.errors);

        return apiClient.get<Movie[]>(`/movies?${searchParams.toString()}`);
      }
      throw error;
    }
  },
};
