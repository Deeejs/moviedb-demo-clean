import { Injectable, Inject } from '@nestjs/common';
import type { UpdateMovieDto, Movie } from '@movie-app/shared-types';
import { IMovieRepository } from '@/interfaces';
import { NotFoundException } from '../../common/exceptions';

@Injectable()
export class UpdateMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute(id: string, data: UpdateMovieDto): Promise<Movie> {
    const existingMovie = await this.movieRepository.findById(id);
    if (!existingMovie) {
      throw new NotFoundException('Movie', id);
    }
    return this.movieRepository.update(id, data);
  }
}
