import { Injectable, Inject } from '@nestjs/common';
import { IRatingRepository } from '@/interfaces';
import { IMovieRepository } from '@/interfaces';

@Injectable()
export class UpdateMovieAverageRatingUseCase {
  constructor(
    @Inject('IRatingRepository')
    private readonly ratingRepository: IRatingRepository,
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute(movieId: string): Promise<void> {
    const ratings = await this.ratingRepository.findByMovie(movieId);

    const totalRatings = ratings.length;
    const averageRating =
      totalRatings > 0
        ? ratings.reduce((sum, rating) => sum + rating.score, 0) / totalRatings
        : 0;

    await this.movieRepository.updateAverageRating(
      movieId,
      averageRating,
      totalRatings,
    );
  }
}
