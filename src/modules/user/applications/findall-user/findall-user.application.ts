import { FindAllUserQueryDto } from 'src/modules/user/web/dto/findall-user.query-dto';
import { UserEntity } from 'src/modules/user/web/entities/user.entity';

export interface FindAllUserApplication {
  execute(
    findAllUserQueryDto: FindAllUserQueryDto,
  ): Promise<[UserEntity[], number]>;
}
