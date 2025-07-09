import { Injectable, Inject } from '@nestjs/common';
import type { UpdateActorDto, Actor } from '@movie-app/shared-types';
import { IActorRepository } from '@/interfaces';
import { NotFoundException } from '../../common/exceptions';

@Injectable()
export class UpdateActorUseCase {
  constructor(
    @Inject('IActorRepository')
    private readonly actorRepository: IActorRepository,
  ) {}

  async execute(id: string, data: UpdateActorDto): Promise<Actor> {
    const existingActor = await this.actorRepository.findById(id);
    if (!existingActor) {
      throw new NotFoundException('Actor', id);
    }
    return this.actorRepository.update(id, data);
  }
}
