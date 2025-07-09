import { z } from "zod";

export const MovieGenreSchema = z.enum([
  "ACTION",
  "ADVENTURE",
  "ANIMATION",
  "BIOGRAPHY",
  "COMEDY",
  "CRIME",
  "DOCUMENTARY",
  "DRAMA",
  "FAMILY",
  "FANTASY",
  "HISTORY",
  "HORROR",
  "MUSICAL",
  "MYSTERY",
  "ROMANCE",
  "SCIENCE_FICTION",
  "THRILLER",
  "WAR",
  "WESTERN",
]);

export const CastMemberSchema: z.ZodSchema = z.object({
  movieId: z.string(),
  actorId: z.string(),
  characterName: z.string().min(1).max(255),
  movie: z.lazy(() => MovieSchema).optional(),
  actor: z.lazy(() => ActorSchema).optional(),
});

export const RatingSchema: z.ZodSchema = z.object({
  id: z.string(),
  score: z.number().min(0).max(10),
  movieId: z.string(),
  movie: z.lazy(() => MovieSchema).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const ActorSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  birthYear: z.number().min(1800).max(new Date().getFullYear()),
  birthPlace: z.string().min(1).max(255),
  bio: z.string().min(1),
  image: z.string().url(),
  knownFor: z.array(z.string().min(1)),
  totalMovies: z.number().min(0),
  castRoles: z.array(CastMemberSchema).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const MovieSchema: z.ZodSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(255),
  year: z
    .number()
    .min(1800)
    .max(new Date().getFullYear() + 10),
  director: z.string().min(1).max(255),
  rating: z.number().min(0).max(10),
  totalRatings: z.number().min(0),
  runtime: z.string().transform((val) => {
    // Transform runtime to standard format
    if (/^\d+\s+mins?$/.test(val)) return val;
    if (/^\d+$/.test(val)) return `${val} mins`;
    if (/^\d+\s*minutes?$/.test(val)) return val.replace(/minutes?/, "mins");
    return val;
  }),
  genres: z.array(z.string()).transform((genres) => {
    // Transform genres to uppercase enum values
    return genres
      .map((genre) => genre.toUpperCase())
      .filter((genre) =>
        [
          "ACTION",
          "ADVENTURE",
          "ANIMATION",
          "BIOGRAPHY",
          "COMEDY",
          "CRIME",
          "DOCUMENTARY",
          "DRAMA",
          "FAMILY",
          "FANTASY",
          "HISTORY",
          "HORROR",
          "MUSICAL",
          "MYSTERY",
          "ROMANCE",
          "SCIENCE_FICTION",
          "THRILLER",
          "WAR",
          "WESTERN",
        ].includes(genre)
      );
  }),
  description: z.string().min(1),
  poster: z.string().url(),
  backdrop: z.string().url(),
  videoUrl: z.string().url().nullable(),
  cast: z.array(CastMemberSchema).optional(),
  ratings: z.array(RatingSchema).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreateMovieDtoSchema = z.object({
  title: z.string().min(1).max(255),
  year: z
    .number()
    .min(1800)
    .max(new Date().getFullYear() + 10),
  director: z.string().min(1).max(255),
  runtime: z.string().regex(/^\d+\s+mins?$/, 'Runtime must be in format "123 mins"'),
  genres: z.array(MovieGenreSchema).min(1),
  description: z.string().min(1),
  poster: z.string().url(),
  backdrop: z.string().url(),
  videoUrl: z.string().url().nullable().optional(),
});

export const UpdateMovieDtoSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  year: z
    .number()
    .min(1800)
    .max(new Date().getFullYear() + 10)
    .optional(),
  director: z.string().min(1).max(255).optional(),
  runtime: z
    .string()
    .regex(/^\d+\s+mins?$/, 'Runtime must be in format "123 mins"')
    .optional(),
  genres: z.array(MovieGenreSchema).min(1).optional(),
  description: z.string().min(1).optional(),
  poster: z.string().url().optional(),
  backdrop: z.string().url().optional(),
  videoUrl: z.string().url().nullable().optional(),
});

export const CreateActorDtoSchema = z.object({
  name: z.string().min(1).max(255),
  birthYear: z.number().min(1800).max(new Date().getFullYear()),
  birthPlace: z.string().min(1).max(255),
  bio: z.string().min(1),
  image: z.string().url(),
  knownFor: z.array(z.string().min(1)),
  totalMovies: z.number().min(0),
});

export const UpdateActorDtoSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  birthYear: z.number().min(1800).max(new Date().getFullYear()).optional(),
  birthPlace: z.string().min(1).max(255).optional(),
  bio: z.string().min(1).optional(),
  image: z.string().url().optional(),
  knownFor: z.array(z.string().min(1)).optional(),
  totalMovies: z.number().min(0).optional(),
});

export const CreateRatingDtoSchema = z.object({
  score: z.number().min(0).max(10),
  movieId: z.string(),
});

export const UpdateRatingDtoSchema = z.object({
  score: z.number().min(0).max(10).optional(),
});

export const CreateCastMemberDtoSchema = z.object({
  movieId: z.string(),
  actorId: z.string(),
  characterName: z.string().min(1).max(255),
});

export const LoginDtoSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const ApiErrorSchema = z.object({
  message: z.string(),
  statusCode: z.number(),
  error: z.string(),
  timestamp: z.string(),
  path: z.string(),
});

export const ValidationErrorSchema = ApiErrorSchema.extend({
  details: z.array(
    z.object({
      field: z.string(),
      message: z.string(),
    })
  ),
});
