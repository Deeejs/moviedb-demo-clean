import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateRatingDto, UpdateRatingDto } from '@movie-app/shared-types';
import { IRatingRepository } from '../interfaces';

@Injectable()
export class RatingsService implements IRatingRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.rating.findMany({
      include: {
        movie: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByMovie(movieId: string) {
    return this.prisma.rating.findMany({
      where: { movieId },
      include: {
        movie: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string) {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
      include: {
        movie: true,
      },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    return rating;
  }

  async create(createRatingDto: CreateRatingDto) {
    return this.prisma.rating.create({
      data: createRatingDto,
      include: {
        movie: true,
      },
    });
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    return this.prisma.rating.update({
      where: { id },
      data: updateRatingDto,
      include: {
        movie: true,
      },
    });
  }

  async delete(id: string) {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }

    await this.prisma.rating.delete({
      where: { id },
    });

    return { message: `Rating with ID ${id} successfully deleted` };
  }
}
