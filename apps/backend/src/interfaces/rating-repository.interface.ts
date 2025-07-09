import type {
  CreateRatingDto,
  UpdateRatingDto,
  Rating,
} from '@movie-app/shared-types';

export interface IRatingRepository {
  findAll(): Promise<Rating[]>;
  findById(id: string): Promise<Rating>;
  create(data: CreateRatingDto): Promise<Rating>;
  update(id: string, data: UpdateRatingDto): Promise<Rating>;
  delete(id: string): Promise<{ message: string }>;
  findByMovie(movieId: string): Promise<Rating[]>;
}
