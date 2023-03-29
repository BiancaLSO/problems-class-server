import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Role } from './../roles/role.enum';
import { UsersService } from 'src/user/user.service';
import { UserEntity } from './../entities/user';

//Used with JWT guard to allow only admin access to endpoint.
@Injectable()
export class TenantGuard implements CanActivate {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId: number = request.user.id;

    const user = await this.usersService.findById(userId);

    console.log('user in guard', user);

    // This returns true if there is a user and
    // the user is an admin
    return user && user.role === Role.User;
  }
}
