import { Injectable, Inject } from '@nestjs/common';
import type { CreateRatingDto, Rating } from '@movie-app/shared-types';
import { IRatingRepository } from '@/interfaces';
import { UpdateMovieAverageRatingUseCase } from './update-movie-average-rating.use-case';

@Injectable()
export class CreateRatingUseCase {
  constructor(
    @Inject('IRatingRepository')
    private readonly ratingRepository: IRatingRepository,
    private readonly updateMovieAverageRatingUseCase: UpdateMovieAverageRatingUseCase,
  ) {}

  async execute(data: CreateRatingDto): Promise<Rating> {
    const rating = await this.ratingRepository.create(data);
    await this.updateMovieAverageRatingUseCase.execute(data.movieId);
    return rating;
  }
}
