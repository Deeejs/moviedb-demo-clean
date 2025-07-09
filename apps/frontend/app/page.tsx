import HomePage from "@/features/home/components/HomePage";
import { movieService } from "@/features/movies/services/movie-service";

export default async function Page() {
  const response = await movieService.getAll();
  return <HomePage initialMovies={response.data} />;
}
