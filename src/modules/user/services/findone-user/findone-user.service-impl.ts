import { UserUseCase } from '@module-user/interfaces/user-usecase';
import { UserRepository } from '@module-user/repository/user.repository';
import { UserEntity } from '@module-user/web/entities/user.entity';
import { Inject, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { FindOneUserService } from './findone-user';

export class FindOneUserServiceImpl<T extends EntityManager>
  implements FindOneUserService<T>
{
  constructor(
    @Inject(UserUseCase.repositories.UserRepository)
    private userRepository: UserRepository<T>,
  ) {}

  async handler(transaction: T, id: string): Promise<UserEntity | null> {
    const r = await this.userRepository.findById(transaction, id);
    if (r) {
      return r;
    }

    throw new NotFoundException('User not found');
  }
}
