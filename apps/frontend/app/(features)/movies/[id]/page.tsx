import { notFound } from "next/navigation";
import { movieService } from "../services/movie-service";
import MovieDetailView from "../components/MovieDetailView";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MovieDetailPage({ params }: MoviePageProps) {
  const { id } = await params;

  try {
    const movie = await movieService.getById(id);
    return <MovieDetailView movie={movie} />;
  } catch (error) {
    console.error("Failed to fetch movie:", error);
    notFound();
  }
}
