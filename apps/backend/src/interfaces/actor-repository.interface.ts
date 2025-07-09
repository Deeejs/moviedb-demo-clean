import type {
  CreateActorDto,
  UpdateActorDto,
  Actor,
  PaginationOptions,
  PaginatedResponse,
} from '@movie-app/shared-types';

export interface IActorRepository {
  findAll(options: PaginationOptions): Promise<PaginatedResponse<Actor>>;
  findById(id: string): Promise<Actor>;
  create(data: CreateActorDto): Promise<Actor>;
  update(id: string, data: UpdateActorDto): Promise<Actor>;
  delete(id: string): Promise<{ message: string }>;
  search(query: string): Promise<Actor[]>;
  findByMovie(movieId: string): Promise<Actor[]>;
}
