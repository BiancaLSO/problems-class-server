import { Module } from '@nestjs/common';
import { ProblemsService } from './problem.service';
import { ProblemsController } from './problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { AdminGuard } from 'src/authentication/roles/admin.guard';
import { UsersService } from 'src/user/user.service';
import { UserEntity } from 'src/authentication/entities/user';
import { TenantEntity } from 'src/authentication/entities/tenant';
import { BoardMemberEntity } from 'src/authentication/entities/boardmember';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Problem,
      UserEntity,
      TenantEntity,
      BoardMemberEntity,
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService, UsersService, AdminGuard],
})
export class ProblemsModule {}
