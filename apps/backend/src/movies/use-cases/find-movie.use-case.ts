import { Injectable, Inject } from '@nestjs/common';
import type { Movie } from '@movie-app/shared-types';
import { IMovieRepository } from '@/interfaces';
import { NotFoundException } from '../../common/exceptions';

@Injectable()
export class FindMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      throw new NotFoundException('Movie', id);
    }
    return movie;
  }
}
