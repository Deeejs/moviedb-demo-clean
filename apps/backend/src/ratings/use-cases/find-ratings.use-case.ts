import { Injectable, Inject } from '@nestjs/common';
import type { Rating } from '@movie-app/shared-types';
import { IRatingRepository } from '@/interfaces';

@Injectable()
export class FindRatingsUseCase {
  constructor(
    @Inject('IRatingRepository')
    private readonly ratingRepository: IRatingRepository,
  ) {}

  async execute(): Promise<Rating[]> {
    return this.ratingRepository.findAll();
  }
}
