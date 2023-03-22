import { UserEntity } from '@module-user/web/entities/user.entity';
import { FindAllUserQueryDto } from '@module-user/web/dto/findall-user.query-dto';

export interface FindAllUserService<T> {
  handler(
    transaction: T,
    findAllUserQueryDto: FindAllUserQueryDto,
  ): Promise<[UserEntity[], number]>;
}
