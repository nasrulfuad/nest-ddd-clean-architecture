import { UserUseCase } from '@module-user/constants/user-usecase';
import { DeleteUserService } from '@module-user/services/delete-user/delete-user.service';
import { FindOneUserService } from '@module-user/services/findone-user/findone-user.service';
import { Inject } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { DeleteUserApplication } from './delete-user.application';

export class DeleteUserApplicationImpl implements DeleteUserApplication {
  constructor(
    @Inject(UserUseCase.services.DeleteUserService)
    private deleteUserService: DeleteUserService<EntityManager>,
    @Inject(UserUseCase.services.FindOneUserService)
    private findOneUserService: FindOneUserService<EntityManager>,
    private dataSource: DataSource,
  ) {}

  async execute(id: string): Promise<void> {
    await this.dataSource.transaction(async (transaction) => {
      const user = await this.findOneUserService.handler(transaction, id);
      await this.deleteUserService.handler(transaction, user.id);
    });
  }
}
