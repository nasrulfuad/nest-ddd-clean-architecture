import {
  PaginationImpl,
  PaginationMetaImpl,
} from '@common/web/pagination/pagination-impl';
import { WebResponseImplBuilder } from '@common/web/web.response-impl';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserApplication } from './applications/create-user/create-user.application';
import { DeleteUserApplication } from './applications/delete-user/delete-user.application';
import { FindAllUserApplication } from './applications/findall-user/findall-user.application';
import { FindOneUserApplication } from './applications/findone-user/findone-user.appliaction';
import { UpdateUserApplication } from './applications/update-user/update-user.application';
import { UserUseCase } from './constants/user-usecase';
import { CreateUserDto } from './web/dto/create-user.dto';
import { FindAllUserQueryDto } from './web/dto/findall-user.query-dto';
import { UpdateUserDto } from './web/dto/update-user.dto';
import { UserEntity } from './web/entities/user.entity';
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
    @Inject(UserUseCase.applications.DeleteUserApplication)
    private deleteUserApplication: DeleteUserApplication,
    @Inject(UserUseCase.applications.UpdateUserApplication)
    private updateUserApplication: UpdateUserApplication,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const d = await this.createUserApplication.execute(createUserDto);
    return new WebResponseImplBuilder<UserEntity>()
      .setMessage('Create a user successfully')
      .setData(d)
      .buildAndtransform(UserEntityImpl);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() findAllUserQueryDto: FindAllUserQueryDto) {
    const [items, totalItems] = await this.findAllUserApplication.execute(
      findAllUserQueryDto,
    );

    const d = new WebResponseImplBuilder<UserEntity[]>()
      .setMessage('Get all users successfully')
      .setData(items)
      .buildAndtransform(UserEntityImpl);

    return new PaginationImpl(
      d,
      new PaginationMetaImpl(
        findAllUserQueryDto.page,
        findAllUserQueryDto.perPage,
        totalItems,
      ),
    );
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    const r = await this.findOneUserApplication.execute(id);

    return new WebResponseImplBuilder<UserEntity>()
      .setMessage('Get a user successfully')
      .setData(r)
      .buildAndtransform(UserEntityImpl);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async delete(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    await this.deleteUserApplication.execute(id);

    return new WebResponseImplBuilder<UserEntity>()
      .setMessage('Delete a user successfully')
      .buildAndtransform(UserEntityImpl);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async update(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const d = await this.updateUserApplication.execute(id, updateUserDto);

    return new WebResponseImplBuilder<UserEntity>()
      .setMessage('Update a user successfully')
      .setData(d)
      .buildAndtransform(UserEntityImpl);
  }
}
