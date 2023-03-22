import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../web/dto/create-user.dto';
import { User } from '../../web/entities/user.entity';
import { CreateUserService } from './create-user.service';

@Injectable()
export class CreateUserServiceImpl implements CreateUserService {
  create(createUserDto: CreateUserDto): Promise<User> {
    console.log(CreateUserServiceImpl.name, createUserDto);

    throw new Error('Method not implemented.');
  }
}
