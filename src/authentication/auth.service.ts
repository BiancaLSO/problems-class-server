import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signupTenant(user: any) {
    return this.usersService.createTenant(
      user.username,
      user.password,
      user.name,
      user.email,
    );
  }

  async signupBoardMember(user: any) {
    return this.usersService.createBoardMember(
      user.username,
      user.password,
      user.name,
      user.phone,
    );
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log('user found', user);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('AuthService login(): user =', user);
    // if (!user) {
    //   console.log('Console log din login cu user ' + user);
    //   throw new BadRequestException('Invalid user object');
    // }
    const payload = {
      username: user.username,
      id: user.id,
      tenantId: user.tenant.id,
    };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
