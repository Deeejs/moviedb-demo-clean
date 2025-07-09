import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { movieService } from "../services/movie-service";
import { movieQueries } from "../queries/movie-queries";
import type { Movie, CreateMovieDto, UpdateMovieDto, PaginatedResponse, SearchParams } from "@movie-app/shared-types";

// Re-export types for easier importing
export type { Movie, CreateMovieDto, UpdateMovieDto, SearchParams };

export function useMovies(initialData?: Movie[]) {
  return useQuery({
    queryKey: movieQueries.lists(),
    queryFn: () => movieService.getAll(),
    initialData: initialData
      ? ({
          data: initialData,
          total: initialData.length,
          page: 1,
          limit: initialData.length,
          hasNextPage: false,
          hasPrevPage: false,
        } as PaginatedResponse<Movie>)
      : undefined,
  });
}

export function useMovie(id: string) {
  return useQuery({
    queryKey: movieQueries.detail(id),
    queryFn: () => movieService.getById(id),
    enabled: !!id,
  });
}

export function useMoviesByActor(actorId: string) {
  return useQuery({
    queryKey: movieQueries.byActor(actorId),
    queryFn: () => movieService.getByActorId(actorId),
    enabled: !!actorId,
  });
}

export function useSearchMovies(query?: string) {
  return useQuery({
    queryKey: movieQueries.search(query || ""),
    queryFn: () => movieService.search({ query }),
    enabled: !!query && query.length > 0,
    placeholderData: (previousData) => previousData,
    staleTime: 30000, // 30 seconds
  });
}

export function useCreateMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMovieDto) => movieService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movieQueries.all });
    },
  });
}

export function useUpdateMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMovieDto }) => movieService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: movieQueries.detail(id) });
      queryClient.invalidateQueries({ queryKey: movieQueries.lists() });
    },
  });
}

export function useDeleteMovie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => movieService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movieQueries.all });
    },
  });
}
