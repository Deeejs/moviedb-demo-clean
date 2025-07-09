import { createZodDto } from 'nestjs-zod';
import { CreateMovieDtoSchema } from '@movie-app/shared-types';

export class CreateMovieDto extends createZodDto(CreateMovieDtoSchema) {}
