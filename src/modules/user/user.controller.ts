import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import {
  PaginationImpl,
  PaginationMetaImpl,
} from 'src/common/web/pagination/pagination-impl';
import { WebResponseImpl } from 'src/common/web/web.response-impl';
import { CreateUserApplication } from './applications/create-user/create-user.application';
import { FindAllUserApplication } from './applications/findall-user/findall-user.application';
import { UserUseCase } from './interfaces/user-usecase';
import { CreateUserDto } from './web/dto/create-user.dto';
import { FindAllUserQueryDto } from './web/dto/findall-user.query-dto';
import { UserEntityImpl } from './web/entities/user.entity-impl';

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
    return new WebResponseImpl(
      'Create user successfully',
      await this.createUserApplication.execute(createUserDto),
    );
  }

  @Get()
  async findAll(@Query() findAllUserQueryDto: FindAllUserQueryDto) {
    const [items, totalItems] = await this.findAllUserApplication.execute(
      findAllUserQueryDto,
    );

    return new PaginationImpl(
      new WebResponseImpl<UserEntityImpl[]>(
        'Get all users successfully',
        items,
      ),
      new PaginationMetaImpl(
        findAllUserQueryDto.page,
        findAllUserQueryDto.perPage,
        totalItems,
      ),
    );
  }
}
