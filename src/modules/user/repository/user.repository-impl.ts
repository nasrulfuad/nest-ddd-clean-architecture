import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateUserDto } from '../web/dto/create-user.dto';
import { FindAllUserQueryDto } from '../web/dto/findall-user.query-dto';
import { UserEntity } from '../web/entities/user.entity';
import { UserEntityImpl } from '../web/entities/user.entity-impl';
import { UserRepository } from './user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntityImpl)
    private userDataSource: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, email, password } = createUserDto;

    const r = await this.userDataSource.save(
      new UserEntityImpl(name, email, password),
    );

    return r;
  }

  async findAll(
    findAllUserQueryDto: FindAllUserQueryDto,
  ): Promise<[UserEntity[], number]> {
    const options: FindManyOptions<UserEntityImpl> = {
      where: {},
    };

    if (findAllUserQueryDto.name) {
      options.where = {
        name: ILike(`%${findAllUserQueryDto.name}%`),
      };
    }

    if (findAllUserQueryDto.page) {
      options.skip = findAllUserQueryDto.skip;
    }

    if (findAllUserQueryDto.perPage) {
      options.take = findAllUserQueryDto.perPage;
    }

    const r = await this.userDataSource.findAndCount(options);
    return r;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userDataSource.findOne({
      where: { email },
    });
  }
}
