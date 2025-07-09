import { Injectable, Inject } from '@nestjs/common';
import type {
  PaginationOptions,
  PaginatedResponse,
  Movie,
} from '@movie-app/shared-types';
import { IMovieRepository } from '@/interfaces';

@Injectable()
export class FindMoviesUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute(options: PaginationOptions): Promise<PaginatedResponse<Movie>> {
    return this.movieRepository.findAll(options);
  }
}
