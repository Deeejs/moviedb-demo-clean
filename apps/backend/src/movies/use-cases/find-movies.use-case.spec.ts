import { Test, TestingModule } from '@nestjs/testing';
import { FindMoviesUseCase } from './find-movies.use-case';
import { IMovieRepository } from '@/interfaces';
import type {
  Movie,
  PaginatedResponse,
  PaginationOptions,
} from '@movie-app/shared-types';

describe('FindMoviesUseCase', () => {
  let useCase: FindMoviesUseCase;
  let movieRepository: jest.Mocked<IMovieRepository>;

  const mockMovies: Movie[] = [
    {
      id: '1',
      title: 'Test Movie 1',
      year: 2023,
      director: 'Test Director 1',
      rating: 4.5,
      totalRatings: 10,
      runtime: '120 min',
      genres: ['ACTION'],
      description: 'Test description 1',
      poster: 'test-poster1.jpg',
      backdrop: 'test-backdrop1.jpg',
      videoUrl: null,
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    {
      id: '2',
      title: 'Test Movie 2',
      year: 2024,
      director: 'Test Director 2',
      rating: 3.8,
      totalRatings: 5,
      runtime: '105 min',
      genres: ['DRAMA'],
      description: 'Test description 2',
      poster: 'test-poster2.jpg',
      backdrop: 'test-backdrop2.jpg',
      videoUrl: null,
      createdAt: new Date('2023-01-02'),
      updatedAt: new Date('2023-01-02'),
    },
  ];

  const mockPaginatedResponse: PaginatedResponse<Movie> = {
    data: mockMovies,
    total: 2,
    page: 1,
    limit: 12,
    hasNextPage: false,
    hasPrevPage: false,
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
        FindMoviesUseCase,
        {
          provide: 'IMovieRepository',
          useValue: mockMovieRepository,
        },
      ],
    }).compile();

    useCase = module.get<FindMoviesUseCase>(FindMoviesUseCase);
    movieRepository = module.get('IMovieRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should find movies with default pagination', async () => {
    movieRepository.findAll.mockResolvedValue(mockPaginatedResponse);

    const result = await useCase.execute({ page: 1, limit: 12 });

    expect(movieRepository.findAll).toHaveBeenCalledWith({
      page: 1,
      limit: 12,
    });
    expect(result).toEqual(mockPaginatedResponse);
  });

  it('should find movies with custom pagination', async () => {
    const customPagination: PaginationOptions = { page: 2, limit: 24 };
    movieRepository.findAll.mockResolvedValue(mockPaginatedResponse);

    const result = await useCase.execute(customPagination);

    expect(movieRepository.findAll).toHaveBeenCalledWith(customPagination);
    expect(result).toEqual(mockPaginatedResponse);
  });

  it('should handle empty results', async () => {
    const emptyResponse: PaginatedResponse<Movie> = {
      data: [],
      total: 0,
      page: 1,
      limit: 12,
      hasNextPage: false,
      hasPrevPage: false,
    };

    movieRepository.findAll.mockResolvedValue(emptyResponse);

    const result = await useCase.execute({ page: 1, limit: 12 });

    expect(result).toEqual(emptyResponse);
    expect(result.data).toHaveLength(0);
  });

  it('should handle repository errors', async () => {
    const error = new Error('Database connection failed');
    movieRepository.findAll.mockRejectedValue(error);

    await expect(useCase.execute({ page: 1, limit: 12 })).rejects.toThrow(
      'Database connection failed',
    );
  });

  it('should handle edge case with zero pagination limit', async () => {
    const edgeCasePagination: PaginationOptions = { page: 1, limit: 0 };
    movieRepository.findAll.mockResolvedValue(mockPaginatedResponse);

    const result = await useCase.execute(edgeCasePagination);

    expect(movieRepository.findAll).toHaveBeenCalledWith(edgeCasePagination);
    expect(result).toEqual(mockPaginatedResponse);
  });

  it('should handle negative page numbers', async () => {
    const negativePagination: PaginationOptions = { page: -1, limit: 12 };
    movieRepository.findAll.mockResolvedValue(mockPaginatedResponse);

    const result = await useCase.execute(negativePagination);

    expect(movieRepository.findAll).toHaveBeenCalledWith(negativePagination);
    expect(result).toEqual(mockPaginatedResponse);
  });
});
