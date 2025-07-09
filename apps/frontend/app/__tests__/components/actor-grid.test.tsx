import { screen, waitFor } from "@testing-library/react";
import { ActorGrid } from "../../(features)/actors/components/actor-grid";
import { useActors } from "../../(features)/actors/hooks/use-actors";
import { mockActors, mockPaginatedActorsResponse } from "../mocks";
import { render } from "../test-utils";

// Mock the useActors hook
jest.mock("../../(features)/actors/hooks/use-actors");

describe("ActorGrid", () => {
  it("renders without crashing", () => {
    (useActors as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    expect(() => render(<ActorGrid />)).not.toThrow();
  });

  it("renders loading state correctly", () => {
    (useActors as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<ActorGrid />);

    expect(screen.queryAllByRole("link").length).toBe(0);
  });

  it("renders error state correctly", () => {
    (useActors as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch actors"),
    });

    render(<ActorGrid />);

    expect(screen.getByText("Failed to load actors. Please try again later.")).toBeInTheDocument();
  });

  it("renders actors correctly", async () => {
    (useActors as jest.Mock).mockReturnValue({
      data: mockPaginatedActorsResponse,
      isLoading: false,
      error: null,
    });

    render(<ActorGrid />);

    await waitFor(() => {
      expect(screen.getByText("Test Actor")).toBeInTheDocument();
      expect(screen.getByText("Test Actor 2")).toBeInTheDocument();
    });
  });

  it("renders actor images with correct attributes", async () => {
    (useActors as jest.Mock).mockReturnValue({
      data: mockPaginatedActorsResponse,
      isLoading: false,
      error: null,
    });

    render(<ActorGrid />);

    await waitFor(() => {
      const image1 = screen.getByAltText("Test Actor");
      const image2 = screen.getByAltText("Test Actor 2");

      expect(image1).toHaveAttribute("src");
      expect(image2).toHaveAttribute("src");
    });
  });

  it("renders actor links with correct hrefs", async () => {
    (useActors as jest.Mock).mockReturnValue({
      data: mockPaginatedActorsResponse,
      isLoading: false,
      error: null,
    });

    render(<ActorGrid />);

    await waitFor(() => {
      const links = screen.getAllByRole("link");
      const link1 = links[0];
      const link2 = links[1];

      expect(link1).toHaveAttribute("href", "/actors/1");
      expect(link2).toHaveAttribute("href", "/actors/2");
    });
  });

  it("renders placeholder image when actor image is missing", async () => {
    const actorsWithoutImage = [
      {
        ...mockActors[0],
        image: null,
      },
    ];

    (useActors as jest.Mock).mockReturnValue({
      data: { ...mockPaginatedActorsResponse, data: actorsWithoutImage },
      isLoading: false,
      error: null,
    });

    render(<ActorGrid />);

    await waitFor(() => {
      expect(screen.getByText("👤")).toBeInTheDocument();
    });
  });

  it("renders empty state when no actors are provided", () => {
    (useActors as jest.Mock).mockReturnValue({
      data: { ...mockPaginatedActorsResponse, data: [] },
      isLoading: false,
      error: null,
    });

    render(<ActorGrid />);

    expect(screen.queryByText("Test Actor")).not.toBeInTheDocument();
  });
});
