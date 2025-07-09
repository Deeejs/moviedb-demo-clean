import { Injectable, Inject } from '@nestjs/common';
import type { Rating } from '@movie-app/shared-types';
import { IRatingRepository } from '@/interfaces';

@Injectable()
export class FindRatingsByMovieUseCase {
  constructor(
    @Inject('IRatingRepository')
    private readonly ratingRepository: IRatingRepository,
  ) {}

  async execute(movieId: string): Promise<Rating[]> {
    return this.ratingRepository.findByMovie(movieId);
  }
}
