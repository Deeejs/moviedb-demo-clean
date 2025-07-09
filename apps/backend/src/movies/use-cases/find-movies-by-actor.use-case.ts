import { Injectable, Inject } from '@nestjs/common';
import type { Movie } from '@movie-app/shared-types';
import { IMovieRepository } from '@/interfaces';

@Injectable()
export class FindMoviesByActorUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute(actorId: string): Promise<Movie[]> {
    return this.movieRepository.findByActor(actorId);
  }
}
