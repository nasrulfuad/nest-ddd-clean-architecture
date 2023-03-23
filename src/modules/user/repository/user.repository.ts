import { CreateUserDto } from '@module-user/web/dto/create-user.dto';
import { FindAllUserQueryDto } from '@module-user/web/dto/findall-user.query-dto';
import { UserEntity } from '@module-user/web/entities/user.entity';

export interface UserRepository<T> {
  /** Create a user */
  create(transaction: T, createUserDto: CreateUserDto): Promise<UserEntity>;
  /** Find all users */
  findAll(
    transaction: T,
    findAllUserQueryDto: FindAllUserQueryDto,
  ): Promise<[UserEntity[], number]>;
  /** Find a user by email */
  findByEmail(transaction: T, email: string): Promise<UserEntity | null>;
  /** Find a user by id */
  findById(transaction: T, id: string): Promise<UserEntity | null>;
}
