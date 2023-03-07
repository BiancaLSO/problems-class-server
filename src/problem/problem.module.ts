import { Module } from '@nestjs/common';
import { ProblemsService } from './problem.service';
import { ProblemsController } from './problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class ProblemsModule {}
