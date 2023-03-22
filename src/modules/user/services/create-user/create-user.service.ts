import { CreateUserDto } from '@module-user/web/dto/create-user.dto';
import { UserEntity } from '@module-user/web/entities/user.entity';

export interface CreateUserService<T> {
  handler(transaction: T, createUserDto: CreateUserDto): Promise<UserEntity>;
}
