import type { Actor, PaginatedResponse } from "@movie-app/shared-types";

export const mockActor: Actor = {
  id: "1",
  name: "Test Actor",
  birthYear: 1980,
  birthPlace: "Test City, Test Country",
  bio: "Test bio",
  image: "https://example.com/test-actor.jpg",
  knownFor: ["Test Movie 1", "Test Movie 2"],
  totalMovies: 2,
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2023-01-01"),
};

export const mockActors: Actor[] = [
  mockActor,
  {
    id: "2",
    name: "Test Actor 2",
    birthYear: 1985,
    birthPlace: "Test City 2, Test Country 2",
    bio: "Test bio 2",
    image: "https://example.com/test-actor-2.jpg",
    knownFor: ["Test Movie 3"],
    totalMovies: 1,
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
];

export const mockPaginatedActorsResponse: PaginatedResponse<Actor> = {
  data: mockActors,
  total: 2,
  page: 1,
  limit: 12,
  hasNextPage: false,
  hasPrevPage: false,
};

export const mockEmptyActorsResponse: PaginatedResponse<Actor> = {
  data: [],
  total: 0,
  page: 1,
  limit: 12,
  hasNextPage: false,
  hasPrevPage: false,
};
