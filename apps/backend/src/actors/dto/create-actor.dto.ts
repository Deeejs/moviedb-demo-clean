import { createZodDto } from 'nestjs-zod';
import { CreateActorDtoSchema } from '@movie-app/shared-types';

export class CreateActorDto extends createZodDto(CreateActorDtoSchema) {}
