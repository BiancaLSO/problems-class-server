import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProblemDTO } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
  ) {}

  create(createProblemDto: CreateProblemDTO) {
    return this.problemRepository.save(createProblemDto);
  }

  findAll() {
    return this.problemRepository.find();
  }

  findOne(id: number) {
    return this.problemRepository.findOneBy({ id: id });
  }

  async update(
    id: number,
    updateProblemDto: UpdateProblemDto,
  ): Promise<Problem> {
    await this.problemRepository.update({ id }, { ...updateProblemDto });
    const updateProblem = await this.problemRepository.findOneBy({ id: id });
    return updateProblem;
  }

  remove(id: number) {
    return this.problemRepository.delete(id);
  }
}
