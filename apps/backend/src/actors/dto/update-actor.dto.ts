import { createZodDto } from 'nestjs-zod';
import { UpdateActorDtoSchema } from '@movie-app/shared-types';

export class UpdateActorDto extends createZodDto(UpdateActorDtoSchema) {}
