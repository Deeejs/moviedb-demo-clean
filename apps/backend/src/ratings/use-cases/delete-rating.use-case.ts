import { Injectable, Inject } from '@nestjs/common';
import { IRatingRepository } from '@/interfaces';
import { UpdateMovieAverageRatingUseCase } from './update-movie-average-rating.use-case';
import { NotFoundException } from '../../common/exceptions';

@Injectable()
export class DeleteRatingUseCase {
  constructor(
    @Inject('IRatingRepository')
    private readonly ratingRepository: IRatingRepository,
    private readonly updateMovieAverageRatingUseCase: UpdateMovieAverageRatingUseCase,
  ) {}

  async execute(id: string): Promise<{ message: string }> {
    const rating = await this.ratingRepository.findById(id);
    if (!rating) {
      throw new NotFoundException('Rating', id);
    }
    const result = await this.ratingRepository.delete(id);
    await this.updateMovieAverageRatingUseCase.execute(rating.movieId);
    return result;
  }
}
