import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('LocalStrategy: Validating user ' + username);

    const user = await this.authService.validateUser(username, password);

    if (!user) {
      console.log(
        'LocalStrategy: User ' + username + ' not found or invalid password',
      );
      throw new UnauthorizedException();
    }

    console.log(
      'LocalStrategy: User ' + username + ' authenticated successfully',
    );

    return user;
  }
}
