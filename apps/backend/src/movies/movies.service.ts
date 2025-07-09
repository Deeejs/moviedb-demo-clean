import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type {
  CreateMovieDto,
  UpdateMovieDto,
  PaginationOptions,
  PaginatedResponse,
  Movie,
} from '@movie-app/shared-types';
import { MovieSchema } from '@movie-app/shared-types';
import { IMovieRepository } from '../interfaces';
import type {
  Movie as PrismaMovie,
  CastMember,
  Actor,
  Rating,
} from '@prisma/client';

type PrismaMovieWithRelations = PrismaMovie & {
  cast?: (CastMember & { actor: Actor })[];
  ratings?: Rating[];
};

@Injectable()
export class MoviesService implements IMovieRepository {
  constructor(private prisma: PrismaService) {}

  private transformMovieForApi(prismaMovie: PrismaMovieWithRelations): Movie {
    // Let Zod schema handle transformation and validation
    return MovieSchema.parse(prismaMovie) as Movie;
  }

  async findAll({
    page,
    limit,
  }: PaginationOptions): Promise<PaginatedResponse<Movie>> {
    const skip = (page - 1) * limit;
    const [rawData, total] = await this.prisma.$transaction([
      this.prisma.movie.findMany({
        skip: skip,
        take: limit,
        include: { cast: { include: { actor: true } }, ratings: true },
        orderBy: { year: 'desc' },
      }),
      this.prisma.movie.count(),
    ]);

    // Transform all movies to match shared schema
    const data = rawData.map((movie) => this.transformMovieForApi(movie));

    return {
      data,
      total,
      page,
      limit,
      hasNextPage: skip + limit < total,
      hasPrevPage: page > 1,
    };
  }

  async findById(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: {
        cast: {
          include: {
            actor: true,
          },
        },
        ratings: true,
      },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return this.transformMovieForApi(movie);
  }

  async create(createMovieDto: CreateMovieDto) {
    const movie = await this.prisma.movie.create({
      data: {
        ...createMovieDto,
        rating: 0,
        totalRatings: 0,
      },
      include: {
        cast: {
          include: {
            actor: true,
          },
        },
        ratings: true,
      },
    });

    return this.transformMovieForApi(movie);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    const updatedMovie = await this.prisma.movie.update({
      where: { id },
      data: updateMovieDto,
      include: {
        cast: {
          include: {
            actor: true,
          },
        },
        ratings: true,
      },
    });

    return this.transformMovieForApi(updatedMovie);
  }

  async delete(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    await this.prisma.movie.delete({
      where: { id },
    });

    return { message: `Movie with ID ${id} successfully deleted` };
  }

  async search(query: string) {
    const movies = await this.prisma.movie.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        cast: {
          include: {
            actor: true,
          },
        },
        ratings: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return movies.map((movie) => this.transformMovieForApi(movie));
  }

  async findByActor(actorId: string) {
    const movies = await this.prisma.movie.findMany({
      where: {
        cast: {
          some: {
            actorId: actorId,
          },
        },
      },
      include: {
        cast: {
          include: {
            actor: true,
          },
        },
        ratings: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return movies.map((movie) => this.transformMovieForApi(movie));
  }

  async updateAverageRating(
    movieId: string,
    averageRating: number,
    totalRatings: number,
  ): Promise<void> {
    await this.prisma.movie.update({
      where: { id: movieId },
      data: {
        rating: averageRating,
        totalRatings: totalRatings,
      },
    });
  }
}
