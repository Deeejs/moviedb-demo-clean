import { Test, TestingModule } from '@nestjs/testing';
import { CreateActorUseCase } from './create-actor.use-case';
import { IActorRepository } from '@/interfaces';
import type { CreateActorDto, Actor } from '@movie-app/shared-types';

describe('CreateActorUseCase', () => {
  let useCase: CreateActorUseCase;
  let actorRepository: jest.Mocked<IActorRepository>;

  const mockActor: Actor = {
    id: '1',
    name: 'Test Actor',
    birthYear: 1990,
    birthPlace: 'Test City',
    bio: 'Test bio',
    image: 'test-image.jpg',
    knownFor: ['Acting'],
    totalMovies: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCreateActorDto: CreateActorDto = {
    name: 'Test Actor',
    birthYear: 1990,
    birthPlace: 'Test City',
    bio: 'Test bio',
    image: 'test-image.jpg',
    knownFor: ['Acting'],
    totalMovies: 0,
  };

  beforeEach(async () => {
    const mockActorRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      search: jest.fn(),
      findByMovie: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateActorUseCase,
        {
          provide: 'IActorRepository',
          useValue: mockActorRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateActorUseCase>(CreateActorUseCase);
    actorRepository = module.get('IActorRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create an actor successfully', async () => {
    actorRepository.create.mockResolvedValue(mockActor);

    const result = await useCase.execute(mockCreateActorDto);

    expect(actorRepository.create).toHaveBeenCalledWith(mockCreateActorDto);
    expect(result).toEqual(mockActor);
  });

  it('should handle repository errors', async () => {
    const error = new Error('Database error');
    actorRepository.create.mockRejectedValue(error);

    await expect(useCase.execute(mockCreateActorDto)).rejects.toThrow(
      'Database error',
    );
  });
});
