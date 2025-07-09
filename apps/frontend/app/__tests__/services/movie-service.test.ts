import { movieService } from "../../(features)/movies/services/movie-service";
import apiClient from "../../../lib/api-client";
import type { CreateMovieDto, UpdateMovieDto } from "@movie-app/shared-types";
import { mockMovie, mockMovies, mockPaginatedMoviesResponse } from "../mocks";

// Mock the API client
jest.mock("../../../lib/api-client", () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("movieService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should fetch all movies with default pagination", async () => {
      mockApiClient.get.mockResolvedValue(mockPaginatedMoviesResponse);

      const result = await movieService.getAll();

      expect(mockApiClient.get).toHaveBeenCalledWith("/movies?page=1&limit=12");
      expect(result).toEqual(mockPaginatedMoviesResponse);
    });

    it("should fetch all movies with custom pagination", async () => {
      mockApiClient.get.mockResolvedValue(mockPaginatedMoviesResponse);

      const result = await movieService.getAll(2, 24);

      expect(mockApiClient.get).toHaveBeenCalledWith("/movies?page=2&limit=24");
      expect(result).toEqual(mockPaginatedMoviesResponse);
    });
  });

  describe("getById", () => {
    it("should fetch movie by id", async () => {
      mockApiClient.get.mockResolvedValue(mockMovie);

      const result = await movieService.getById("1");

      expect(mockApiClient.get).toHaveBeenCalledWith("/movies/1");
      expect(result).toEqual(mockMovie);
    });
  });

  describe("getByActorId", () => {
    it("should fetch movies by actor id", async () => {
      const mockMovies = [mockMovie];
      mockApiClient.get.mockResolvedValue(mockMovies);

      const result = await movieService.getByActorId("actor-1");

      expect(mockApiClient.get).toHaveBeenCalledWith("/movies/by-actor/actor-1");
      expect(result).toEqual(mockMovies);
    });
  });

  describe("create", () => {
    it("should create a new movie", async () => {
      const createData: CreateMovieDto = {
        title: "New Movie",
        year: 2024,
        director: "New Director",
        runtime: "105 min",
        genres: ["Drama"],
        description: "New plot",
        poster: "/new-poster.jpg",
        backdrop: "/new-backdrop.jpg",
      };

      mockApiClient.post.mockResolvedValue(mockMovie);

      const result = await movieService.create(createData);

      expect(mockApiClient.post).toHaveBeenCalledWith("/movies", createData);
      expect(result).toEqual(mockMovie);
    });
  });

  describe("update", () => {
    it("should update a movie", async () => {
      const updateData: UpdateMovieDto = {
        title: "Updated Movie",
        year: 2024,
      };

      mockApiClient.patch.mockResolvedValue(mockMovie);

      const result = await movieService.update("1", updateData);

      expect(mockApiClient.patch).toHaveBeenCalledWith("/movies/1", updateData);
      expect(result).toEqual(mockMovie);
    });
  });

  describe("delete", () => {
    it("should delete a movie", async () => {
      mockApiClient.delete.mockResolvedValue(undefined);

      await movieService.delete("1");

      expect(mockApiClient.delete).toHaveBeenCalledWith("/movies/1");
    });
  });

  describe("search", () => {
    it("should search movies with query only", async () => {
      mockApiClient.get.mockResolvedValue(mockMovies);

      const result = await movieService.search({ query: "test" });

      expect(mockApiClient.get).toHaveBeenCalledWith("/movies?q=test");
      expect(result).toEqual(mockMovies);
    });

    it("should search movies with query and ignore pagination params", async () => {
      mockApiClient.get.mockResolvedValue(mockMovies);

      const result = await movieService.search({ query: "test", limit: 5, page: 2 });

      // Should only send query parameter, not limit or page
      expect(mockApiClient.get).toHaveBeenCalledWith("/movies?q=test");
      expect(result).toEqual(mockMovies);
    });

    it("should search movies with empty query", async () => {
      mockApiClient.get.mockResolvedValue(mockMovies);

      const result = await movieService.search({});

      expect(mockApiClient.get).toHaveBeenCalledWith("/movies?");
      expect(result).toEqual(mockMovies);
    });

    it("should handle search with only pagination params (no query)", async () => {
      mockApiClient.get.mockResolvedValue(mockMovies);

      const result = await movieService.search({ limit: 10, page: 2 });

      // Should send empty query string since no actual query provided
      expect(mockApiClient.get).toHaveBeenCalledWith("/movies?");
      expect(result).toEqual(mockMovies);
    });
  });
});
