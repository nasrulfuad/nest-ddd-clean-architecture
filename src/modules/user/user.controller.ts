import {
  PaginationImpl,
  PaginationMetaImpl
} from '@common/web/pagination/pagination-impl';
import { WebResponseImpl } from '@common/web/web.response-impl';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query
} from '@nestjs/common';
import { CreateUserApplication } from './applications/create-user/create-user.application';
import { FindAllUserApplication } from './applications/findall-user/findall-user.application';
import { FindOneUserApplication } from './applications/findone-user/findone-user.appliaction';
import { UserUseCase } from './constants/user-usecase';
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
    @Inject(UserUseCase.applications.FindOneUserApplication)
    private findOneUserApplication: FindOneUserApplication,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return new WebResponseImpl(
      'Create a user successfully',
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

  @Get('/:id')
  async findOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return new WebResponseImpl(
      'Get a user successfully',
      await this.findOneUserApplication.execute(id),
    );
  }
}
