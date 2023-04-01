import { CreateUserDto } from '@module-user/web/dto/create-user.dto';
import { FindAllUserQueryDto } from '@module-user/web/dto/findall-user.query-dto';
import { UserEntity } from '@module-user/web/entities/user.entity';
import { UserEntityImpl } from '@module-user/web/entities/user.entity-impl';
import { EntityManager, FindManyOptions, ILike } from 'typeorm';
import { UserRepository } from './user.repository';

export class UserRepositoryImpl<T extends EntityManager>
  implements UserRepository<T>
{
  async create(
    transaction: T,
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    const { name, email, password } = createUserDto;

    return await transaction.save(
      UserEntityImpl,
      new UserEntityImpl(name, email, password),
    );
  }

  async findAll(
    transaction: T,
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

    return await transaction.findAndCount(UserEntityImpl, options);
  }

  async findById(transaction: T, id: string): Promise<UserEntity> {
    return await transaction.findOne(UserEntityImpl, {
      where: { id },
    });
  }

  async findByEmail(transaction: T, email: string): Promise<UserEntity> {
    return await transaction.findOne(UserEntityImpl, {
      where: { email },
    });
  }

  async delete(transaction: T, id: string): Promise<void> {
    await transaction.delete(UserEntityImpl, {
      id,
    });
  }
}
