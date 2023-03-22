import { UserUseCase } from '@module-user/interfaces/user-usecase';
import { FindOneUserService } from '@module-user/services/findone-user/findone-user';
import { UserEntity } from '@module-user/web/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { FindOneUserApplication } from './findone-user.appliaction';

@Injectable()
export class FindOneUserApplicationImpl implements FindOneUserApplication {
  constructor(
    @Inject(UserUseCase.services.FindOneUserService)
    private findOneUserService: FindOneUserService<EntityManager>,
    private dataSource: DataSource,
  ) {}

  async execute(id: string): Promise<UserEntity | null> {
    return await this.dataSource.transaction(async (transaction) => {
      return this.findOneUserService.handler(transaction, id);
    });
  }
}
