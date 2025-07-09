export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  rating: number;
  totalRatings: number;
  runtime: string;
  genres: string[];
  description: string;
  poster: string;
  backdrop: string;
  videoUrl: string | null;
  cast?: CastMember[];
  ratings?: Rating[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Actor {
  id: string;
  name: string;
  birthYear: number;
  birthPlace: string;
  bio: string;
  image: string;
  knownFor: string[];
  totalMovies: number;
  castRoles?: CastMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CastMember {
  movieId: string;
  actorId: string;
  characterName: string;
  movie?: Movie;
  actor?: Actor;
}

export interface Rating {
  id: string;
  score: number;
  movieId: string;
  movie?: Movie;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMovieDto {
  title: string;
  year: number;
  director: string;
  runtime: string;
  genres: string[];
  description: string;
  poster: string;
  backdrop: string;
  videoUrl?: string | null;
}

export interface UpdateMovieDto {
  title?: string;
  year?: number;
  director?: string;
  runtime?: string;
  genres?: string[];
  description?: string;
  poster?: string;
  backdrop?: string;
  videoUrl?: string | null;
}

export interface CreateActorDto {
  name: string;
  birthYear: number;
  birthPlace: string;
  bio: string;
  image: string;
  knownFor: string[];
  totalMovies: number;
}

export interface UpdateActorDto {
  name?: string;
  birthYear?: number;
  birthPlace?: string;
  bio?: string;
  image?: string;
  knownFor?: string[];
  totalMovies?: number;
}

export interface CreateRatingDto {
  score: number;
  movieId: string;
}

export interface UpdateRatingDto {
  score?: number;
}

export interface CreateCastMemberDto {
  movieId: string;
  actorId: string;
  characterName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export type MovieGenre =
  | "ACTION"
  | "ADVENTURE"
  | "ANIMATION"
  | "BIOGRAPHY"
  | "COMEDY"
  | "CRIME"
  | "DOCUMENTARY"
  | "DRAMA"
  | "FAMILY"
  | "FANTASY"
  | "HISTORY"
  | "HORROR"
  | "MUSICAL"
  | "MYSTERY"
  | "ROMANCE"
  | "SCIENCE_FICTION"
  | "THRILLER"
  | "WAR"
  | "WESTERN";

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SearchParams {
  query?: string;
  limit?: number;
  page?: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error: string;
  timestamp: string;
  path: string;
}

export interface ValidationError extends ApiError {
  details: {
    field: string;
    message: string;
  }[];
}
