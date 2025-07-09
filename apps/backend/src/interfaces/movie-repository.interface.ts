import type {
  CreateMovieDto,
  UpdateMovieDto,
  Movie,
  PaginationOptions,
  PaginatedResponse,
} from '@movie-app/shared-types';

export interface IMovieRepository {
  findAll(options: PaginationOptions): Promise<PaginatedResponse<Movie>>;
  findById(id: string): Promise<Movie>;
  create(data: CreateMovieDto): Promise<Movie>;
  update(id: string, data: UpdateMovieDto): Promise<Movie>;
  delete(id: string): Promise<{ message: string }>;
  search(query: string): Promise<Movie[]>;
  findByActor(actorId: string): Promise<Movie[]>;
  updateAverageRating(
    movieId: string,
    averageRating: number,
    totalRatings: number,
  ): Promise<void>;
}
