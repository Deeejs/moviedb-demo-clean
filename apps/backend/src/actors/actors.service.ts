import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type {
  CreateActorDto,
  UpdateActorDto,
  PaginationOptions,
  PaginatedResponse,
  Actor,
} from '@movie-app/shared-types';
import { ActorSchema } from '@movie-app/shared-types';
import { IActorRepository } from '../interfaces';
import type { Actor as PrismaActor, CastMember, Movie } from '@prisma/client';

type PrismaActorWithRelations = PrismaActor & {
  castRoles?: (CastMember & { movie: Movie })[];
};

@Injectable()
export class ActorsService implements IActorRepository {
  constructor(private prisma: PrismaService) {}

  private transformActorForApi(prismaActor: PrismaActorWithRelations): Actor {
    // Let Zod schema handle transformation and validation
    return ActorSchema.parse(prismaActor);
  }

  async findAll({
    page,
    limit,
  }: PaginationOptions): Promise<PaginatedResponse<Actor>> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.actor.findMany({
        skip: skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      this.prisma.actor.count(),
    ]);

    // Transform all actors to match shared schema
    const transformedData = data.map((actor) =>
      this.transformActorForApi(actor),
    );

    return {
      data: transformedData,
      total,
      page,
      limit,
      hasNextPage: skip + limit < total,
      hasPrevPage: page > 1,
    };
  }

  async findById(id: string) {
    const actor = await this.prisma.actor.findUnique({
      where: { id },
      include: {
        castRoles: {
          include: {
            movie: true,
          },
        },
      },
    });

    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }

    return this.transformActorForApi(actor);
  }

  async create(createActorDto: CreateActorDto) {
    const actor = await this.prisma.actor.create({
      data: createActorDto,
      include: {
        castRoles: {
          include: {
            movie: true,
          },
        },
      },
    });

    return this.transformActorForApi(actor);
  }

  async update(id: string, updateActorDto: UpdateActorDto) {
    const actor = await this.prisma.actor.findUnique({
      where: { id },
    });

    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }

    const updatedActor = await this.prisma.actor.update({
      where: { id },
      data: updateActorDto,
      include: {
        castRoles: {
          include: {
            movie: true,
          },
        },
      },
    });

    return this.transformActorForApi(updatedActor);
  }

  async delete(id: string) {
    const actor = await this.prisma.actor.findUnique({
      where: { id },
    });

    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }

    await this.prisma.actor.delete({
      where: { id },
    });

    return { message: `Actor with ID ${id} successfully deleted` };
  }

  async search(query: string) {
    const actors = await this.prisma.actor.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        castRoles: {
          include: {
            movie: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return actors.map((actor) => this.transformActorForApi(actor));
  }

  async findByMovie(movieId: string) {
    const actors = await this.prisma.actor.findMany({
      where: {
        castRoles: {
          some: {
            movieId: movieId,
          },
        },
      },
      include: {
        castRoles: {
          where: {
            movieId: movieId,
          },
          include: {
            movie: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return actors.map((actor) => this.transformActorForApi(actor));
  }
}
