export const ratingQueries = {
  all: ["ratings"] as const,
  lists: () => [...ratingQueries.all, "list"] as const,
  list: (filters: string) => [...ratingQueries.lists(), { filters }] as const,
  details: () => [...ratingQueries.all, "detail"] as const,
  detail: (id: string) => [...ratingQueries.details(), id] as const,
  byMovie: (movieId: string) => [...ratingQueries.all, "byMovie", movieId] as const,
} as const;
