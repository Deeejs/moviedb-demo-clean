import { Injectable, Inject } from '@nestjs/common';
import { IActorRepository } from '@/interfaces';
import { NotFoundException } from '../../common/exceptions';

@Injectable()
export class DeleteActorUseCase {
  constructor(
    @Inject('IActorRepository')
    private readonly actorRepository: IActorRepository,
  ) {}

  async execute(id: string): Promise<{ message: string }> {
    const existingActor = await this.actorRepository.findById(id);
    if (!existingActor) {
      throw new NotFoundException('Actor', id);
    }
    return this.actorRepository.delete(id);
  }
}
