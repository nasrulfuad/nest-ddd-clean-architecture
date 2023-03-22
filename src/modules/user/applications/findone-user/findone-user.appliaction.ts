import { UserEntity } from '@module-user/web/entities/user.entity';

export interface FindOneUserApplication {
  execute(id: string): Promise<UserEntity | null>;
}
