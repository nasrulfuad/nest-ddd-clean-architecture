import { UserUseCase } from '@module-user/constants/user-usecase';
import { CreateUserService } from '@module-user/services/create-user/create-user.service';
import { CreateUserDto } from '@module-user/web/dto/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateUserApplication } from './create-user.application';

@Injectable()
export class CreateUserApplicationImpl implements CreateUserApplication {
  constructor(
    @Inject(UserUseCase.services.CreateUserService)
    private createUserService: CreateUserService<EntityManager>,
    private dataSource: DataSource,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    return await this.dataSource.transaction(async (transactionManager) => {
      return await this.createUserService.handler(
        transactionManager,
        createUserDto,
      );
    });
  }
}
