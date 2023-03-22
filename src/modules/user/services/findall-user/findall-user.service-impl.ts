import { UserUseCase } from '@module-user/interfaces/user-usecase';
import { UserRepository } from '@module-user/repository/user.repository';
import { FindAllUserQueryDto } from '@module-user/web/dto/findall-user.query-dto';
import { UserEntity } from '@module-user/web/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { FindAllUserService } from './findall-user.service';

@Injectable()
export class FindAllUserServiceImpl<T extends EntityManager>
  implements FindAllUserService<T>
{
  constructor(
    @Inject(UserUseCase.repositories.UserRepository)
    private userRepository: UserRepository<T>,
  ) {}

  async handler(
    transaction: T,
    findAllUserQueryDto: FindAllUserQueryDto,
  ): Promise<[UserEntity[], number]> {
    return this.userRepository.findAll(transaction, findAllUserQueryDto);
  }
}
