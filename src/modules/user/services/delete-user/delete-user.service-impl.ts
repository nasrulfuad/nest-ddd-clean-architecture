import { Inject } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserUseCase } from '@module-user/constants/user-usecase';
import { UserRepository } from '@module-user/repository/user.repository';
import { DeleteUserService } from './delete-user.service';

export class DeleteUserServiceImpl<T extends EntityManager>
  implements DeleteUserService<T>
{
  constructor(
    @Inject(UserUseCase.repositories.UserRepository)
    private userRepository: UserRepository<T>,
  ) {}

  async handler(transaction: T, id: string): Promise<void> {
    await this.userRepository.delete(transaction, id);
  }
}
