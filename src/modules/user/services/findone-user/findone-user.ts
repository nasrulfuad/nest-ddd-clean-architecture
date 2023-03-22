import { UserEntity } from '@module-user/web/entities/user.entity';

export interface FindOneUserService<T> {
  findOne(transaction: T, id: string): Promise<UserEntity | null>;
}
