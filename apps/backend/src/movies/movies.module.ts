import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import {
  CreateMovieUseCase,
  FindMoviesUseCase,
  FindMovieUseCase,
  UpdateMovieUseCase,
  DeleteMovieUseCase,
  SearchMoviesUseCase,
  FindMoviesByActorUseCase,
} from './use-cases';

@Module({
  controllers: [MoviesController],
  providers: [
    MoviesService,
    {
      provide: 'IMovieRepository',
      useClass: MoviesService,
    },
    CreateMovieUseCase,
    FindMoviesUseCase,
    FindMovieUseCase,
    UpdateMovieUseCase,
    DeleteMovieUseCase,
    SearchMoviesUseCase,
    FindMoviesByActorUseCase,
  ],
  exports: [MoviesService, 'IMovieRepository'],
})
export class MoviesModule {}
