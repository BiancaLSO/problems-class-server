import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardMemberEntity } from 'src/authentication/entities/boardmember';
import { TenantEntity } from 'src/authentication/entities/tenant';
import { UserEntity } from 'src/authentication/entities/user';
import { UsersService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TenantEntity, BoardMemberEntity]),
  ],
  providers: [UsersService],
  exports: [
    UsersService,
    TypeOrmModule.forFeature([UserEntity, TenantEntity, BoardMemberEntity]),
  ],
})
export class UsersModule {}
