import { notFound } from "next/navigation";
import { actorService } from "../services/actor-service";
import ActorDetailView from "../components/ActorDetailView";
interface ActorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ActorDetailPage({ params }: ActorPageProps) {
  const { id } = await params;

  try {
    const actor = await actorService.getById(id);
    return <ActorDetailView actor={actor} />;
  } catch (error) {
    console.error("Failed to fetch actor:", error);
    notFound();
  }
}
