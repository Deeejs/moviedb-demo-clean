export const actorQueries = {
  all: ["actors"] as const,
  lists: () => [...actorQueries.all, "list"] as const,
  list: (filters: string) => [...actorQueries.lists(), { filters }] as const,
  details: () => [...actorQueries.all, "detail"] as const,
  detail: (id: string) => [...actorQueries.details(), id] as const,
  byMovie: (movieId: string) => [...actorQueries.all, "byMovie", movieId] as const,
  search: (query: string) => [...actorQueries.all, "search", query] as const,
} as const;
