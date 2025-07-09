import { Injectable, Inject } from '@nestjs/common';
import type { CreateActorDto, Actor } from '@movie-app/shared-types';
import { IActorRepository } from '@/interfaces';

@Injectable()
export class CreateActorUseCase {
  constructor(
    @Inject('IActorRepository')
    private readonly actorRepository: IActorRepository,
  ) {}

  async execute(data: CreateActorDto): Promise<Actor> {
    return this.actorRepository.create(data);
  }
}
