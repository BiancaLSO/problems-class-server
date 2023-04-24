import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProblemDTO } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
    private readonly httpService: HttpService,
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

  async saveImage(base64encodedImage: string) {
    const formData = new FormData();
    formData.append('image', base64encodedImage);
    const { data: imageData } = await firstValueFrom(
      this.httpService
        .post(
          `https://freeimage.host/api/1/upload?key=${process.env.IMG_API_KEY}`,
          formData,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log('error!!!');
            throw error;
          }),
        ),
    );
    return imageData.image.display_url;
  }
}
