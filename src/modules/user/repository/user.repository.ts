import { CreateUserDto } from '@module-user/web/dto/create-user.dto';
import { FindAllUserQueryDto } from '@module-user/web/dto/findall-user.query-dto';
import { UserEntity } from '@module-user/web/entities/user.entity';

export interface UserRepository<T> {
  create(transaction: T, createUserDto: CreateUserDto): Promise<UserEntity>;
  findAll(
    transaction: T,
    findAllUserQueryDto: FindAllUserQueryDto,
  ): Promise<[UserEntity[], number]>;
  findByEmail(transaction: T, email: string): Promise<UserEntity | null>;
  findById(transaction: T, id: string): Promise<UserEntity | null>;
}
