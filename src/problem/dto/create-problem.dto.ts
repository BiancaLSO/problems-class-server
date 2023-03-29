import { UserEntity } from 'src/authentication/entities/user';

export class CreateProblemDTO {
  user: UserEntity;
  constructor(public subject: string, public description: string) {}
}
