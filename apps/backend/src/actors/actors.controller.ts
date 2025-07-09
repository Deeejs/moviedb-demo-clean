import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { CombinedAuthGuard } from '../auth/combined-auth.guard';
import {
  CreateActorUseCase,
  FindActorsUseCase,
  FindActorUseCase,
  UpdateActorUseCase,
  DeleteActorUseCase,
  SearchActorsUseCase,
  FindActorsByMovieUseCase,
} from './use-cases';

@Controller('actors')
export class ActorsController {
  constructor(
    private readonly createActorUseCase: CreateActorUseCase,
    private readonly findActorsUseCase: FindActorsUseCase,
    private readonly findActorUseCase: FindActorUseCase,
    private readonly updateActorUseCase: UpdateActorUseCase,
    private readonly deleteActorUseCase: DeleteActorUseCase,
    private readonly searchActorsUseCase: SearchActorsUseCase,
    private readonly findActorsByMovieUseCase: FindActorsByMovieUseCase,
  ) {}

  @Get()
  findAll(
    @Query('q') q?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '12',
  ) {
    const pageNum = Math.max(1, +page || 1);
    const limitNum = Math.min(100, Math.max(1, +limit || 12));

    if (q) {
      return this.searchActorsUseCase.execute(q);
    }
    return this.findActorsUseCase.execute({ page: pageNum, limit: limitNum });
  }

  @Get('by-movie/:movieId')
  findByMovie(@Param('movieId') movieId: string) {
    return this.findActorsByMovieUseCase.execute(movieId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findActorUseCase.execute(id);
  }

  @Post()
  @UseGuards(CombinedAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createActorDto: CreateActorDto) {
    return this.createActorUseCase.execute(createActorDto);
  }

  @Patch(':id')
  @UseGuards(CombinedAuthGuard)
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.updateActorUseCase.execute(id, updateActorDto);
  }

  @Delete(':id')
  @UseGuards(CombinedAuthGuard)
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.deleteActorUseCase.execute(id);
  }
}
