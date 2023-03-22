import { Inject, Injectable } from '@nestjs/common';
import { UserUseCase } from '../../interfaces/user-usecase';
import { UserRepository } from '../../repository/user.repository';
import { FindAllUserQueryDto } from '../../web/dto/findall-user.query-dto';
import { UserEntity } from '../../web/entities/user.entity';
import { FindAllUserService } from './findall-user.service';

@Injectable()
export class FindAllUserServiceImpl implements FindAllUserService {
  constructor(
    @Inject(UserUseCase.repositories.UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findAll(
    findAllUserQueryDto: FindAllUserQueryDto,
  ): Promise<UserEntity[]> {
    return this.userRepository.findAll(findAllUserQueryDto);
  }
}
