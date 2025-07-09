import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { actorService } from "../services/actor-service";
import { actorQueries } from "../queries/actor-queries";
import type { Actor, CreateActorDto, UpdateActorDto, SearchParams } from "@movie-app/shared-types";

// Re-export types for easier importing
export type { Actor, CreateActorDto, UpdateActorDto, SearchParams };

export function useActors() {
  return useQuery({
    queryKey: actorQueries.lists(),
    queryFn: () => actorService.getAll(),
  });
}

export function useActor(id: string) {
  return useQuery({
    queryKey: actorQueries.detail(id),
    queryFn: () => actorService.getById(id),
    enabled: !!id,
  });
}

export function useActorsByMovie(movieId: string) {
  return useQuery({
    queryKey: actorQueries.byMovie(movieId),
    queryFn: () => actorService.getByMovieId(movieId),
    enabled: !!movieId,
  });
}

export function useSearchActors(query?: string) {
  return useQuery({
    queryKey: actorQueries.search(query || ""),
    queryFn: () => actorService.search({ query }),
    enabled: !!query && query.length > 0,
    placeholderData: (previousData) => previousData,
    staleTime: 30000, // 30 seconds
  });
}

export function useCreateActor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateActorDto) => actorService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: actorQueries.all });
    },
  });
}

export function useUpdateActor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateActorDto }) => actorService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: actorQueries.detail(id) });
      queryClient.invalidateQueries({ queryKey: actorQueries.lists() });
    },
  });
}

export function useDeleteActor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => actorService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: actorQueries.all });
    },
  });
}
