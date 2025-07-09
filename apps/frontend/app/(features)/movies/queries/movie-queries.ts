export const movieQueries = {
  all: ["movies"] as const,
  lists: () => [...movieQueries.all, "list"] as const,
  list: (filters: string) => [...movieQueries.lists(), { filters }] as const,
  details: () => [...movieQueries.all, "detail"] as const,
  detail: (id: string) => [...movieQueries.details(), id] as const,
  byActor: (actorId: string) => [...movieQueries.all, "byActor", actorId] as const,
  search: (query: string) => [...movieQueries.all, "search", query] as const,
} as const;
