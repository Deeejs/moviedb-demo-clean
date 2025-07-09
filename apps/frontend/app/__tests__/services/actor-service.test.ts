import { actorService } from "../../(features)/actors/services/actor-service";
import apiClient from "../../../lib/api-client";
import type { CreateActorDto, UpdateActorDto } from "@movie-app/shared-types";
import { mockActor, mockPaginatedActorsResponse } from "../mocks";

// Mock the API client
jest.mock("../../../lib/api-client", () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
}));

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("actorService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should fetch all actors with default pagination", async () => {
      mockApiClient.get.mockResolvedValue(mockPaginatedActorsResponse);

      const result = await actorService.getAll();

      expect(mockApiClient.get).toHaveBeenCalledWith("/actors?page=1&limit=12");
      expect(result).toEqual(mockPaginatedActorsResponse);
    });

    it("should fetch all actors with custom pagination", async () => {
      mockApiClient.get.mockResolvedValue(mockPaginatedActorsResponse);

      const result = await actorService.getAll(2, 24);

      expect(mockApiClient.get).toHaveBeenCalledWith("/actors?page=2&limit=24");
      expect(result).toEqual(mockPaginatedActorsResponse);
    });
  });

  describe("getById", () => {
    it("should fetch actor by id", async () => {
      mockApiClient.get.mockResolvedValue(mockActor);

      const result = await actorService.getById("1");

      expect(mockApiClient.get).toHaveBeenCalledWith("/actors/1");
      expect(result).toEqual(mockActor);
    });
  });

  describe("getByMovieId", () => {
    it("should fetch actors by movie id", async () => {
      const mockActors = [mockActor];
      mockApiClient.get.mockResolvedValue(mockActors);

      const result = await actorService.getByMovieId("movie-1");

      expect(mockApiClient.get).toHaveBeenCalledWith("/actors/by-movie/movie-1");
      expect(result).toEqual(mockActors);
    });
  });

  describe("create", () => {
    it("should create a new actor", async () => {
      const createData: CreateActorDto = {
        name: "New Actor",
        birthYear: 1990,
        birthPlace: "New City, New Country",
        bio: "New bio",
        image: "/new-actor.jpg",
        knownFor: ["New Movie"],
        totalMovies: 1,
      };

      mockApiClient.post.mockResolvedValue(mockActor);

      const result = await actorService.create(createData);

      expect(mockApiClient.post).toHaveBeenCalledWith("/actors", createData);
      expect(result).toEqual(mockActor);
    });
  });

  describe("update", () => {
    it("should update an actor", async () => {
      const updateData: UpdateActorDto = {
        name: "Updated Actor",
        birthYear: 1985,
      };

      mockApiClient.patch.mockResolvedValue(mockActor);

      const result = await actorService.update("1", updateData);

      expect(mockApiClient.patch).toHaveBeenCalledWith("/actors/1", updateData);
      expect(result).toEqual(mockActor);
    });
  });

  describe("delete", () => {
    it("should delete an actor", async () => {
      mockApiClient.delete.mockResolvedValue(undefined);

      await actorService.delete("1");

      expect(mockApiClient.delete).toHaveBeenCalledWith("/actors/1");
    });
  });

  describe("search", () => {
    it("should search actors with query only", async () => {
      const mockActors = [mockActor];
      mockApiClient.get.mockResolvedValue(mockActors);

      const result = await actorService.search({ query: "test" });

      expect(mockApiClient.get).toHaveBeenCalledWith("/actors?q=test");
      expect(result).toEqual(mockActors);
    });

    it("should search actors with query and ignore limit", async () => {
      const mockActors = [mockActor];
      mockApiClient.get.mockResolvedValue(mockActors);

      const result = await actorService.search({ query: "test", limit: 5 });

      // Should only send query parameter, not limit
      expect(mockApiClient.get).toHaveBeenCalledWith("/actors?q=test");
      expect(result).toEqual(mockActors);
    });

    it("should search actors with empty query and ignore limit", async () => {
      const mockActors = [mockActor];
      mockApiClient.get.mockResolvedValue(mockActors);

      const result = await actorService.search({ limit: 10 });

      // Should send empty query string since no actual query provided
      expect(mockApiClient.get).toHaveBeenCalledWith("/actors?");
      expect(result).toEqual(mockActors);
    });

    it("should search actors with empty query and no parameters", async () => {
      const mockActors = [mockActor];
      mockApiClient.get.mockResolvedValue(mockActors);

      const result = await actorService.search({});

      expect(mockApiClient.get).toHaveBeenCalledWith("/actors?");
      expect(result).toEqual(mockActors);
    });
  });
});
