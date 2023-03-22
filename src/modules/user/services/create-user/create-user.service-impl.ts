import { Inject } from '@nestjs/common';
import { UserUseCase } from '../../interfaces/user-usecase';
import { UserRepository } from '../../repository/user.repository';
import { CreateUserDto } from '../../web/dto/create-user.dto';
import { User } from '../../web/entities/user.entity';
import { CreateUserService } from './create-user.service';

export class CreateUserServiceImpl implements CreateUserService {
  constructor(
    @Inject(UserUseCase.repositories.UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(CreateUserServiceImpl.name, createUserDto);

    return await this.userRepository.create(createUserDto);
  }
}
