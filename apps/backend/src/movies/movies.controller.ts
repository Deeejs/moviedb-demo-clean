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
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CombinedAuthGuard } from '../auth/combined-auth.guard';
import {
  CreateMovieUseCase,
  FindMoviesUseCase,
  FindMovieUseCase,
  UpdateMovieUseCase,
  DeleteMovieUseCase,
  SearchMoviesUseCase,
  FindMoviesByActorUseCase,
} from './use-cases';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly findMoviesUseCase: FindMoviesUseCase,
    private readonly findMovieUseCase: FindMovieUseCase,
    private readonly updateMovieUseCase: UpdateMovieUseCase,
    private readonly deleteMovieUseCase: DeleteMovieUseCase,
    private readonly searchMoviesUseCase: SearchMoviesUseCase,
    private readonly findMoviesByActorUseCase: FindMoviesByActorUseCase,
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
      return this.searchMoviesUseCase.execute(q);
    }
    return this.findMoviesUseCase.execute({ page: pageNum, limit: limitNum });
  }

  @Get('by-actor/:actorId')
  findByActor(@Param('actorId') actorId: string) {
    return this.findMoviesByActorUseCase.execute(actorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findMovieUseCase.execute(id);
  }

  @Post()
  @UseGuards(CombinedAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.createMovieUseCase.execute(createMovieDto);
  }

  @Patch(':id')
  @UseGuards(CombinedAuthGuard)
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.updateMovieUseCase.execute(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(CombinedAuthGuard)
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.deleteMovieUseCase.execute(id);
  }
}
