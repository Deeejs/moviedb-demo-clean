import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ratingService } from "../services/rating-service";
import { ratingQueries } from "../queries/rating-queries";
import { movieQueries } from "@/features/movies/queries/movie-queries";
import type { Rating, CreateRatingDto, UpdateRatingDto } from "@movie-app/shared-types";

// Re-export types for easier importing
export type { Rating, CreateRatingDto, UpdateRatingDto };

export function useRatings() {
  return useQuery({
    queryKey: ratingQueries.lists(),
    queryFn: ratingService.getAll,
  });
}

export function useRating(id: string) {
  return useQuery({
    queryKey: ratingQueries.detail(id),
    queryFn: () => ratingService.getById(id),
    enabled: !!id,
  });
}

export function useRatingsByMovie(movieId: string) {
  return useQuery({
    queryKey: ratingQueries.byMovie(movieId),
    queryFn: () => ratingService.getByMovieId(movieId),
    enabled: !!movieId,
  });
}

export function useCreateRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRatingDto) => ratingService.create(data),
    onSuccess: (_, { movieId }) => {
      queryClient.invalidateQueries({ queryKey: ratingQueries.all });
      queryClient.invalidateQueries({ queryKey: ratingQueries.byMovie(movieId) });
      queryClient.invalidateQueries({ queryKey: movieQueries.detail(movieId) });
    },
  });
}

export function useUpdateRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRatingDto }) => ratingService.update(id, data),
    onSuccess: (rating) => {
      queryClient.invalidateQueries({ queryKey: ratingQueries.detail(rating.id) });
      queryClient.invalidateQueries({ queryKey: ratingQueries.byMovie(rating.movieId) });
      queryClient.invalidateQueries({ queryKey: movieQueries.detail(rating.movieId) });
    },
  });
}

export function useDeleteRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ratingService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ratingQueries.all });
    },
  });
}
