import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/user/user.service';
import { UserEntity } from '../entities/user';
import { Role } from './role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId: number = request.user.id;

    const user = await this.usersService.findById(userId);

    console.log('user in admin guard', user);

    // This returns true if there is a user and
    // the user is an admin
    return user && user.role === Role.Admin;
  }
}
