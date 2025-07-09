import { Injectable, Inject } from '@nestjs/common';
import type { UpdateRatingDto, Rating } from '@movie-app/shared-types';
import { IRatingRepository } from '@/interfaces';
import { UpdateMovieAverageRatingUseCase } from './update-movie-average-rating.use-case';
import { NotFoundException } from '../../common/exceptions';

@Injectable()
export class UpdateRatingUseCase {
  constructor(
    @Inject('IRatingRepository')
    private readonly ratingRepository: IRatingRepository,
    private readonly updateMovieAverageRatingUseCase: UpdateMovieAverageRatingUseCase,
  ) {}

  async execute(id: string, data: UpdateRatingDto): Promise<Rating> {
    const existingRating = await this.ratingRepository.findById(id);
    if (!existingRating) {
      throw new NotFoundException('Rating', id);
    }
    const updatedRating = await this.ratingRepository.update(id, data);
    await this.updateMovieAverageRatingUseCase.execute(existingRating.movieId);
    return updatedRating;
  }
}
