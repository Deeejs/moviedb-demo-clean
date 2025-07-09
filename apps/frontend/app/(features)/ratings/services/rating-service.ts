import apiClient from "@/lib/api-client";
import type { Rating, CreateRatingDto, UpdateRatingDto } from "@movie-app/shared-types";

export const ratingService = {
  async getAll(): Promise<Rating[]> {
    return apiClient.get<Rating[]>("/ratings");
  },

  async getById(id: string): Promise<Rating> {
    return apiClient.get<Rating>(`/ratings/${id}`);
  },

  async getByMovieId(movieId: string): Promise<Rating[]> {
    return apiClient.get<Rating[]>(`/ratings/by-movie/${movieId}`);
  },

  async create(data: CreateRatingDto): Promise<Rating> {
    return apiClient.post<Rating>("/ratings", data);
  },

  async update(id: string, data: UpdateRatingDto): Promise<Rating> {
    return apiClient.patch<Rating>(`/ratings/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/ratings/${id}`);
  },
};
