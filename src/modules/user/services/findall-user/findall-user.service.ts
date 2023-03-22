import { UserEntity } from '@module-user/web/entities/user.entity';
import { FindAllUserQueryDto } from '@module-user/web/dto/findall-user.query-dto';

export interface FindAllUserService {
  findAll(
    findAllUserQueryDto: FindAllUserQueryDto,
  ): Promise<[UserEntity[], number]>;
}
