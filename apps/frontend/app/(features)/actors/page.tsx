import { actorService } from "./services/actor-service";
import ActorsPageView from "./components/ActorsPageView";

export default async function ActorsPage({
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

  const { data: actors, total, hasNextPage, hasPrevPage } = await actorService.getAll(validatedPage, validatedLimit);

  return <ActorsPageView actors={actors} total={total} hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />;
}
