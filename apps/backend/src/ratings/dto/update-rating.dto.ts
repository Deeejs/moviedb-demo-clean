import { createZodDto } from 'nestjs-zod';
import { UpdateRatingDtoSchema } from '@movie-app/shared-types';

export class UpdateRatingDto extends createZodDto(UpdateRatingDtoSchema) {}
