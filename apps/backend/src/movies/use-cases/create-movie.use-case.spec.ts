import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieUseCase } from './create-movie.use-case';
import { IMovieRepository } from '@/interfaces';
import type { CreateMovieDto, Movie } from '@movie-app/shared-types';

describe('CreateMovieUseCase', () => {
  let useCase: CreateMovieUseCase;
  let movieRepository: jest.Mocked<IMovieRepository>;

  const mockMovie: Movie = {
    id: '1',
    title: 'Test Movie',
    year: 2023,
    director: 'Test Director',
    rating: 0,
    totalRatings: 0,
    runtime: '120 min',
    genres: ['ACTION'],
    description: 'Test description',
    poster: 'test-poster.jpg',
    backdrop: 'test-backdrop.jpg',
    videoUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCreateMovieDto: CreateMovieDto = {
    title: 'Test Movie',
    year: 2023,
    director: 'Test Director',
    runtime: '120 min',
    genres: ['ACTION'],
    description: 'Test description',
    poster: 'test-poster.jpg',
    backdrop: 'test-backdrop.jpg',
  };

  beforeEach(async () => {
    const mockMovieRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      search: jest.fn(),
      findByActor: jest.fn(),
      updateAverageRating: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMovieUseCase,
        {
          provide: 'IMovieRepository',
          useValue: mockMovieRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateMovieUseCase>(CreateMovieUseCase);
    movieRepository = module.get('IMovieRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a movie successfully', async () => {
    movieRepository.create.mockResolvedValue(mockMovie);

    const result = await useCase.execute(mockCreateMovieDto);

    expect(movieRepository.create).toHaveBeenCalledWith(mockCreateMovieDto);
    expect(result).toEqual(mockMovie);
  });

  it('should handle repository errors', async () => {
    const error = new Error('Database error');
    movieRepository.create.mockRejectedValue(error);

    await expect(useCase.execute(mockCreateMovieDto)).rejects.toThrow(
      'Database error',
    );
  });
});
