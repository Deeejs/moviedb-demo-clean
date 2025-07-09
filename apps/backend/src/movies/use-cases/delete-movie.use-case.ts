import { Injectable, Inject } from '@nestjs/common';
import { IMovieRepository } from '@/interfaces';
import { NotFoundException } from '../../common/exceptions';

@Injectable()
export class DeleteMovieUseCase {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute(id: string): Promise<{ message: string }> {
    const existingMovie = await this.movieRepository.findById(id);
    if (!existingMovie) {
      throw new NotFoundException('Movie', id);
    }
    return this.movieRepository.delete(id);
  }
}
