import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import {
  CreateActorUseCase,
  FindActorsUseCase,
  FindActorUseCase,
  UpdateActorUseCase,
  DeleteActorUseCase,
  SearchActorsUseCase,
  FindActorsByMovieUseCase,
} from './use-cases';

@Module({
  controllers: [ActorsController],
  providers: [
    ActorsService,
    {
      provide: 'IActorRepository',
      useClass: ActorsService,
    },
    CreateActorUseCase,
    FindActorsUseCase,
    FindActorUseCase,
    UpdateActorUseCase,
    DeleteActorUseCase,
    SearchActorsUseCase,
    FindActorsByMovieUseCase,
  ],
  exports: [ActorsService],
})
export class ActorsModule {}
