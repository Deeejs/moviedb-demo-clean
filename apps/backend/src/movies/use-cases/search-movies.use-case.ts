import { Injectable, Inject } from '@nestjs/common';
import type { Movie } from '@movie-app/shared-types';
import { IMovieRepository } from '@/interfaces';

@Injectable()
export class SearchMoviesUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute(query: string): Promise<Movie[]> {
    return this.movieRepository.search(query);
  }
}
