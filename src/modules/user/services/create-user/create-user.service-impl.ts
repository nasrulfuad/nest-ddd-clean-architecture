import { UserUseCase } from '@module-user/constants/user-usecase';
import { UserRepository } from '@module-user/repository/user.repository';
import { CreateUserDto } from '@module-user/web/dto/create-user.dto';
import { UserEntity } from '@module-user/web/entities/user.entity';
import { BadRequestException, Inject } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateUserService } from './create-user.service';

export class CreateUserServiceImpl<T extends EntityManager>
  implements CreateUserService<T>
{
  constructor(
    @Inject(UserUseCase.repositories.UserRepository)
    private userRepository: UserRepository<EntityManager>,
  ) {}

  async handler(
    transaction: T,
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    if (
      await this.userRepository.findByEmail(transaction, createUserDto.email)
    ) {
      throw new BadRequestException('Email already exists');
    }

    return await this.userRepository.create(transaction, createUserDto);
  }
}
