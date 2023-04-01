import { UserUseCase } from '@module-user/constants/user-usecase';
import { FindOneUserService } from '@module-user/services/findone-user/findone-user.service';
import { UserEntity } from '@module-user/web/entities/user.entity';
import { Inject } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { FindOneUserApplication } from './findone-user.appliaction';

export class FindOneUserApplicationImpl implements FindOneUserApplication {
  constructor(
    @Inject(UserUseCase.services.FindOneUserService)
    private findOneUserService: FindOneUserService<EntityManager>,
    private dataSource: DataSource,
  ) {}

  async execute(id: string): Promise<UserEntity | null> {
    return await this.dataSource.transaction(async (transaction) => {
      return await this.findOneUserService.handler(transaction, id);
    });
  }
}
