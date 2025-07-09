import { Injectable, Inject } from '@nestjs/common';
import type {
  PaginationOptions,
  PaginatedResponse,
  Actor,
} from '@movie-app/shared-types';
import { IActorRepository } from '@/interfaces';

@Injectable()
export class FindActorsUseCase {
  constructor(
    @Inject('IActorRepository')
    private readonly actorRepository: IActorRepository,
  ) {}

  async execute(options: PaginationOptions): Promise<PaginatedResponse<Actor>> {
    return this.actorRepository.findAll(options);
  }
}
