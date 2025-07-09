import apiClient from "@/lib/api-client";
import type { Actor, CreateActorDto, UpdateActorDto, PaginatedResponse, SearchParams } from "@movie-app/shared-types";
import { ActorSchema } from "@movie-app/shared-types";
import { z } from "zod";

export const actorService = {
  async getAll(page: number = 1, limit: number = 12): Promise<PaginatedResponse<Actor>> {
    return apiClient.get<PaginatedResponse<Actor>>(`/actors?page=${page}&limit=${limit}`);
  },

  async getById(id: string): Promise<Actor> {
    try {
      const response = await apiClient.get<Actor>(`/actors/${id}`);
      return ActorSchema.parse(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.warn("Actor validation failed:", error.errors);
        // Return the original response if validation fails to maintain functionality
        return apiClient.get<Actor>(`/actors/${id}`);
      }
      throw error;
    }
  },

  async getByMovieId(movieId: string): Promise<Actor[]> {
    try {
      const response = await apiClient.get<Actor[]>(`/actors/by-movie/${movieId}`);
      return z.array(ActorSchema).parse(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.warn("Actors array validation failed:", error.errors);

        return apiClient.get<Actor[]>(`/actors/by-movie/${movieId}`);
      }
      throw error;
    }
  },

  async create(data: CreateActorDto): Promise<Actor> {
    return apiClient.post<Actor>("/actors", data);
  },

  async update(id: string, data: UpdateActorDto): Promise<Actor> {
    return apiClient.patch<Actor>(`/actors/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/actors/${id}`);
  },

  async search(params: SearchParams): Promise<Actor[]> {
    const searchParams = new URLSearchParams();
    if (params.query) searchParams.append("q", params.query);

    try {
      const response = await apiClient.get<Actor[]>(`/actors?${searchParams.toString()}`);
      return z.array(ActorSchema).parse(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.warn("Actor search validation failed:", error.errors);
        // Return the original response if validation fails to maintain functionality
        return apiClient.get<Actor[]>(`/actors?${searchParams.toString()}`);
      }
      throw error;
    }
  },
};
