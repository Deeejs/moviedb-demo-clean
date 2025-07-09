import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { CombinedAuthGuard } from '../auth/combined-auth.guard';
import {
  CreateRatingUseCase,
  FindRatingsUseCase,
  FindRatingUseCase,
  UpdateRatingUseCase,
  DeleteRatingUseCase,
  FindRatingsByMovieUseCase,
} from './use-cases';

@Controller('ratings')
export class RatingsController {
  constructor(
    private readonly createRatingUseCase: CreateRatingUseCase,
    private readonly findRatingsUseCase: FindRatingsUseCase,
    private readonly findRatingUseCase: FindRatingUseCase,
    private readonly updateRatingUseCase: UpdateRatingUseCase,
    private readonly deleteRatingUseCase: DeleteRatingUseCase,
    private readonly findRatingsByMovieUseCase: FindRatingsByMovieUseCase,
  ) {}

  @Get()
  findAll() {
    return this.findRatingsUseCase.execute();
  }

  @Get('by-movie/:movieId')
  findByMovie(@Param('movieId') movieId: string) {
    return this.findRatingsByMovieUseCase.execute(movieId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findRatingUseCase.execute(id);
  }

  @Post()
  @UseGuards(CombinedAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.createRatingUseCase.execute(createRatingDto);
  }

  @Patch(':id')
  @UseGuards(CombinedAuthGuard)
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.updateRatingUseCase.execute(id, updateRatingDto);
  }

  @Delete(':id')
  @UseGuards(CombinedAuthGuard)
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.deleteRatingUseCase.execute(id);
  }
}
