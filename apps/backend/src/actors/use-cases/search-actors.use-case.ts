import { Injectable, Inject } from '@nestjs/common';
import type { Actor } from '@movie-app/shared-types';
import { IActorRepository } from '@/interfaces';

@Injectable()
export class SearchActorsUseCase {
  constructor(
    @Inject('IActorRepository')
    private readonly actorRepository: IActorRepository,
  ) {}

  async execute(query: string): Promise<Actor[]> {
    return this.actorRepository.search(query);
  }
}
