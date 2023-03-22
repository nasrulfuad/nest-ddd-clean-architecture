import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { CreateUserApplication } from './applications/create-user/create-user.application';
import { FindAllUserApplication } from './applications/findall-user/findall-user.application';
import { UserUseCase } from './interfaces/user-usecase';
import { CreateUserDto } from './web/dto/create-user.dto';
import { FindAllUserQueryDto } from './web/dto/findall-user.query-dto';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(
    @Inject(UserUseCase.applications.CreateUserApplication)
    private createUserApplication: CreateUserApplication,
    @Inject(UserUseCase.applications.FindAllUserApplication)
    private findAllUserApplication: FindAllUserApplication,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const r = await this.createUserApplication.execute(createUserDto);
    return r;
  }

  @Get()
  async findAll(@Query() findAllUserQueryDto: FindAllUserQueryDto) {
    const r = await this.findAllUserApplication.execute(findAllUserQueryDto);
    return r;
  }
}
