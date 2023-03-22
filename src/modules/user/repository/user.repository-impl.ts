import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateUserDto } from '../web/dto/create-user.dto';
import { FindAllUserQueryDto } from '../web/dto/findall-user.query-dto';
import { User } from '../web/entities/user.entity';
import { UserImpl } from '../web/entities/user.entity-impl';
import { UserRepository } from './user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserImpl)
    private userDataSource: Repository<UserImpl>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const u = new UserImpl();
    u.name = createUserDto.name;
    u.email = createUserDto.email;
    u.password = createUserDto.password;
    const r = await this.userDataSource.save(u);
    return r;
  }

  async findAll(findAllUserQueryDto: FindAllUserQueryDto): Promise<User[]> {
    const options: FindManyOptions<UserImpl> = {};

    if (findAllUserQueryDto.name) {
      options.where = {
        name: ILike(`%${findAllUserQueryDto.name}%`),
      };
    }

    const r = await this.userDataSource.find(options);
    return r;
  }
}
