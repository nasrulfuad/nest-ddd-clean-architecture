import { BadRequestException, Inject } from '@nestjs/common';
import { UserUseCase } from '../../interfaces/user-usecase';
import { UserRepository } from '../../repository/user.repository';
import { CreateUserDto } from '../../web/dto/create-user.dto';
import { UserEntity } from '../../web/entities/user.entity';
import { CreateUserService } from './create-user.service';

export class CreateUserServiceImpl implements CreateUserService {
  constructor(
    @Inject(UserUseCase.repositories.UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    if (await this.userRepository.findByEmail(createUserDto.email)) {
      throw new BadRequestException('Email already exists');
    }

    return await this.userRepository.create(createUserDto);
  }
}
