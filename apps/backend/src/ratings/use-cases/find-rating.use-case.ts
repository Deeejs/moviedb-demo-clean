import { Injectable, Inject } from '@nestjs/common';
import type { Rating } from '@movie-app/shared-types';
import { IRatingRepository } from '@/interfaces';
import { NotFoundException } from '../../common/exceptions';

@Injectable()
export class FindRatingUseCase {
  constructor(
    @Inject('IRatingRepository')
    private readonly ratingRepository: IRatingRepository,
  ) {}

  async execute(id: string): Promise<Rating> {
    const rating = await this.ratingRepository.findById(id);
    if (!rating) {
      throw new NotFoundException('Rating', id);
    }
    return rating;
  }
}
