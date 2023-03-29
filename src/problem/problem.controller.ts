import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProblemsService } from './problem.service';
import { CreateProblemDTO } from './dto/create-problem.dto';
import { UsersService } from 'src/user/user.service';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { AdminGuard } from 'src/authentication/roles/admin.guard';

@Controller('problems')
export class ProblemsController {
  constructor(
    private readonly problemsService: ProblemsService,
  ) // private readonly usersService: UsersService,
  {}

  @Post()
  create(@Body() createProblemDto: CreateProblemDTO) {
    // const user = this.usersService.findById(2);
    return this.problemsService.create(createProblemDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll(@Request() req: any) {
    console.log('user/tenant in ctrl', req.user);
    return this.problemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
    return this.problemsService.update(+id, updateProblemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemsService.remove(+id);
  }
}
