import { movieService } from "./services/movie-service";
import MoviesPageView from "./components/MoviesPageView";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // Parse search parameters with defaults
  const page = params.page ? Number(params.page) : 1;
  const limit = params.limit ? Number(params.limit) : 12;

  // Ensure page and limit are within valid ranges
  const validatedPage = Math.max(1, Math.min(page, 1000));
  const validatedLimit = Math.max(1, Math.min(limit, 100));

  const { data: movies, total, hasNextPage, hasPrevPage } = await movieService.getAll(validatedPage, validatedLimit);

  return <MoviesPageView movies={movies} total={total} hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />;
}
