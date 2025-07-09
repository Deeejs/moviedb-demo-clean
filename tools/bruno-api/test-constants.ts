// Test constants for Bruno API collection
// Contains only the essential IDs used in Bruno tests

export const TEST_IDS = {
  // Core actors used in Bruno tests
  ACTORS: {
    SAMUEL_L_JACKSON: "21e3e439-b3a0-4f97-8a1e-3e89d53f74e9",
    UMA_THURMAN: "2fa0063f-b174-4689-8cd0-aa9da6877408",
    RYAN_GOSLING: "bd7a2521-7505-4923-9c61-099ababa1209",
    JOHN_TRAVOLTA: "b8ba805b-ef07-4f44-a9d2-e87e85160d7e",
    EMMA_STONE: "ddffbcab-c558-4b3d-bcd2-a181dc0c3dcc",
    LEONARDO_DICAPRIO: "46d05b4e-f3ca-4710-bcc8-9dbdd94b009f",
  },

  // Core movies used in Bruno tests
  MOVIES: {
    PULP_FICTION: "31275281-09f7-4758-90a7-dcf758db6ec3",
    LA_LA_LAND: "99d4ecda-b069-4f06-b005-1246b1013b15",
    WOLF_OF_WALL_STREET: "5249c14f-880a-4ccb-828e-568398f749b6",
  },
} as const;

// Export individual IDs for convenience
export const ACTOR_IDS = TEST_IDS.ACTORS;
export const MOVIE_IDS = TEST_IDS.MOVIES;
