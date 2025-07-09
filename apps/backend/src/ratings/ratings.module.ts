import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { MoviesModule } from '../movies/movies.module';
import {
  CreateRatingUseCase,
  FindRatingsUseCase,
  FindRatingUseCase,
  UpdateRatingUseCase,
  DeleteRatingUseCase,
  FindRatingsByMovieUseCase,
  UpdateMovieAverageRatingUseCase,
} from './use-cases';

@Module({
  imports: [MoviesModule],
  controllers: [RatingsController],
  providers: [
    RatingsService,
    {
      provide: 'IRatingRepository',
      useClass: RatingsService,
    },
    CreateRatingUseCase,
    FindRatingsUseCase,
    FindRatingUseCase,
    UpdateRatingUseCase,
    DeleteRatingUseCase,
    FindRatingsByMovieUseCase,
    UpdateMovieAverageRatingUseCase,
  ],
  exports: [RatingsService],
})
export class RatingsModule {}
