import { createZodDto } from 'nestjs-zod';
import { CreateRatingDtoSchema } from '@movie-app/shared-types';

export class CreateRatingDto extends createZodDto(CreateRatingDtoSchema) {}
