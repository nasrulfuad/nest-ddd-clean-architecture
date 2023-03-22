import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateUserApplication } from './applications/create-user/create-user.application';
import { UserUseCase } from './interfaces/user-usecase';
import { CreateUserDto } from './web/dto/create-user.dto';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(
    @Inject(UserUseCase.applications.CreateUserApplication) private createUserApplication: CreateUserApplication,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const r = await this.createUserApplication.execute(createUserDto);
    return r;
  }
}
