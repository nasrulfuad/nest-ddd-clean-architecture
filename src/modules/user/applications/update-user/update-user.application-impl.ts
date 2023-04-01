import { UserUseCase } from '@module-user/constants/user-usecase';
import { UpdateUserService } from '@module-user/services/update-user/update-user.service';
import { UpdateUserDto } from '@module-user/web/dto/update-user.dto';
import { UserEntity } from '@module-user/web/entities/user.entity';
import { Inject } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { UpdateUserApplication } from './update-user.application';
import { FindOneUserService } from '@module-user/services/findone-user/findone-user.service';

export class UpdateUserApplicationImpl implements UpdateUserApplication {
  constructor(
    @Inject(UserUseCase.services.FindOneUserService)
    private readonly findOneUserService: FindOneUserService<EntityManager>,
    @Inject(UserUseCase.services.UpdateUserService)
    private readonly updateUserService: UpdateUserService<EntityManager>,
    private dataSource: DataSource,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.dataSource.transaction(async (transaction) => {
      const r = await this.findOneUserService.handler(transaction, id);

      return await this.updateUserService.handler(
        transaction,
        r.id,
        updateUserDto,
      );
    });
  }
}
