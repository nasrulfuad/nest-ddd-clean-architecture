import { UserUseCase } from '@module-user/constants/user-usecase';
import { UserRepository } from '@module-user/repository/user.repository';
import { UpdateUserDto } from '@module-user/web/dto/update-user.dto';
import { UserEntity } from '@module-user/web/entities/user.entity';
import { ConflictException, Inject } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UpdateUserService } from './update-user.service';

export class UpdateUserServiceImpl<T extends EntityManager>
  implements UpdateUserService<T>
{
  constructor(
    @Inject(UserUseCase.repositories.UserRepository)
    private userRepository: UserRepository<T>,
  ) {}

  async handler(
    transaction: T,
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const isEmailExist = await this.userRepository.checkEmailExist(
      transaction,
      id,
      updateUserDto.email,
    );

    if (isEmailExist) {
      throw new ConflictException(
        `Email ${updateUserDto.email} is already in use`,
      );
    }

    return await this.userRepository.update(transaction, id, updateUserDto);
  }
}
