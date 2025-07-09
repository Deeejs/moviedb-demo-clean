import type { Movie, PaginatedResponse } from "@movie-app/shared-types";

export const mockMovie: Movie = {
  id: "1",
  title: "Test Movie",
  year: 2023,
  director: "Test Director",
  rating: 8.5,
  totalRatings: 100,
  runtime: "120 min",
  genres: ["ACTION"],
  description: "Test description",
  poster: "https://example.com/test-poster.jpg",
  backdrop: "https://example.com/test-backdrop.jpg",
  videoUrl: null,
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2023-01-01"),
};

export const mockMovies: Movie[] = [
  mockMovie,
  {
    id: "2",
    title: "Test Movie 2",
    year: 2024,
    director: "Test Director 2",
    rating: 7.8,
    totalRatings: 85,
    runtime: "105 min",
    genres: ["DRAMA", "ROMANCE"],
    description: "Test description 2",
    poster: "https://example.com/test-poster-2.jpg",
    backdrop: "https://example.com/test-backdrop-2.jpg",
    videoUrl: null,
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
];

export const mockPaginatedMoviesResponse: PaginatedResponse<Movie> = {
  data: mockMovies,
  total: 2,
  page: 1,
  limit: 12,
  hasNextPage: false,
  hasPrevPage: false,
};

export const mockEmptyMoviesResponse: PaginatedResponse<Movie> = {
  data: [],
  total: 0,
  page: 1,
  limit: 12,
  hasNextPage: false,
  hasPrevPage: false,
};
