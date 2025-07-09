import { Injectable, Inject } from '@nestjs/common';
import type { Actor } from '@movie-app/shared-types';
import { IActorRepository } from '@/interfaces';

@Injectable()
export class FindActorsByMovieUseCase {
  constructor(
    @Inject('IActorRepository')
    private readonly actorRepository: IActorRepository,
  ) {}

  async execute(movieId: string): Promise<Actor[]> {
    return this.actorRepository.findByMovie(movieId);
  }
}
