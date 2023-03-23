import { UserUseCase } from '@module-user/constants/user-usecase';
import { FindAllUserService } from '@module-user/services/findall-user/findall-user.service';
import { FindAllUserQueryDto } from '@module-user/web/dto/findall-user.query-dto';
import { UserEntity } from '@module-user/web/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { FindAllUserApplication } from './findall-user.application';

@Injectable()
export class FindAllUserApplicationImpl implements FindAllUserApplication {
  constructor(
    @Inject(UserUseCase.services.FindAllUserService)
    private findAllUserService: FindAllUserService<EntityManager>,
    private dataSource: DataSource,
  ) {}

  async execute(
    findAllUserQueryDto: FindAllUserQueryDto,
  ): Promise<[UserEntity[], number]> {
    return await this.dataSource.transaction(async (transaction) => {
      return await this.findAllUserService.handler(
        transaction,
        findAllUserQueryDto,
      );
    });
  }
}
