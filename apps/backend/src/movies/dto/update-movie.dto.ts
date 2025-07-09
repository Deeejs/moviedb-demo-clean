import { createZodDto } from 'nestjs-zod';
import { UpdateMovieDtoSchema } from '@movie-app/shared-types';

export class UpdateMovieDto extends createZodDto(UpdateMovieDtoSchema) {}
