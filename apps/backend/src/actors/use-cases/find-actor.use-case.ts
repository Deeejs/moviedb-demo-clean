import { Injectable, Inject } from '@nestjs/common';
import type { Actor } from '@movie-app/shared-types';
import { IActorRepository } from '@/interfaces';
import { NotFoundException } from '../../common/exceptions';

@Injectable()
export class FindActorUseCase {
  constructor(
    @Inject('IActorRepository')
    private readonly actorRepository: IActorRepository,
  ) {}

  async execute(id: string): Promise<Actor> {
    const actor = await this.actorRepository.findById(id);
    if (!actor) {
      throw new NotFoundException('Actor', id);
    }
    return actor;
  }
}
