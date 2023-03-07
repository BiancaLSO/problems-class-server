import { PartialType } from '@nestjs/mapped-types';
import { CreateProblemDTO } from './create-problem.dto';

export class UpdateProblemDto extends PartialType(CreateProblemDTO) {}
