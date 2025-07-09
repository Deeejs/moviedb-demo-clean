import { Injectable, Inject } from '@nestjs/common';
import type { CreateMovieDto, Movie } from '@movie-app/shared-types';
import { IMovieRepository } from '@/interfaces';

@Injectable()
export class CreateMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute(data: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.create(data);
  }
}
