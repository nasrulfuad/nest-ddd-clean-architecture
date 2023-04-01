import { CreateUserDto } from '@module-user/web/dto/create-user.dto';
import { FindAllUserQueryDto } from '@module-user/web/dto/findall-user.query-dto';
import { UserEntity } from '@module-user/web/entities/user.entity';
import { UpdateUserDto } from '@module-user/web/dto/update-user.dto';

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
  /** Delete a user by id */
  delete(transaction: T, id: string): Promise<void>;
  /** Update a user */
  update(transaction: T, id: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
  /** Check email exist other than the user id */
  checkEmailExist(transaction: T, id: string, email: string): Promise<UserEntity>;
}
