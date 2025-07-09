import { screen, waitFor } from "@testing-library/react";
import { MovieGrid } from "../../(features)/movies/components/movie-grid";
import { useMovies } from "../../(features)/movies/hooks/use-movies";
import { mockMovies, mockPaginatedMoviesResponse } from "../mocks";
import { render } from "../test-utils";

// Mock the useMovies hook
jest.mock("../../(features)/movies/hooks/use-movies");

describe("MovieGrid", () => {
  it("renders without crashing", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    expect(() => render(<MovieGrid />)).not.toThrow();
  });

  it("renders loading state correctly", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<MovieGrid />);

    expect(screen.queryAllByRole("link").length).toBe(0);
  });

  it("renders error state correctly", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch movies"),
    });

    render(<MovieGrid />);

    expect(screen.getByText("Failed to load movies. Please try again later.")).toBeInTheDocument();
  });

  it("renders movies correctly", async () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: mockPaginatedMoviesResponse,
      isLoading: false,
      error: null,
    });

    render(<MovieGrid />);

    await waitFor(() => {
      expect(screen.getByText("Test Movie")).toBeInTheDocument();
      expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
      expect(screen.getByText("2023")).toBeInTheDocument();
      expect(screen.getByText("2024")).toBeInTheDocument();
    });
  });

  it("renders movie posters with correct attributes", async () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: mockPaginatedMoviesResponse,
      isLoading: false,
      error: null,
    });

    render(<MovieGrid />);

    await waitFor(() => {
      const poster1 = screen.getByAltText("Test Movie");
      const poster2 = screen.getByAltText("Test Movie 2");

      expect(poster1).toHaveAttribute("src");
      expect(poster2).toHaveAttribute("src");
    });
  });

  it("renders movie links with correct hrefs", async () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: mockPaginatedMoviesResponse,
      isLoading: false,
      error: null,
    });

    render(<MovieGrid />);

    await waitFor(() => {
      const links = screen.getAllByRole("link");
      const link1 = links[0];
      const link2 = links[1];

      expect(link1).toHaveAttribute("href", "/movies/1");
      expect(link2).toHaveAttribute("href", "/movies/2");
    });
  });

  it("handles initialMovies prop correctly", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: mockPaginatedMoviesResponse,
      isLoading: false,
      error: null,
    });

    render(<MovieGrid initialMovies={mockMovies} />);

    expect(useMovies).toHaveBeenCalledWith(mockMovies);
  });

  it("renders placeholder image when poster is missing", async () => {
    const moviesWithoutPoster = [
      {
        ...mockMovies[0],
        poster: null,
      },
    ];

    (useMovies as jest.Mock).mockReturnValue({
      data: { ...mockPaginatedMoviesResponse, data: moviesWithoutPoster },
      isLoading: false,
      error: null,
    });

    render(<MovieGrid />);

    await waitFor(() => {
      expect(screen.getByText("🎬")).toBeInTheDocument();
    });
  });

  it("renders empty state when no movies are provided", () => {
    (useMovies as jest.Mock).mockReturnValue({
      data: { ...mockPaginatedMoviesResponse, data: [] },
      isLoading: false,
      error: null,
    });

    render(<MovieGrid />);

    expect(screen.queryByText("Test Movie")).not.toBeInTheDocument();
  });
});
