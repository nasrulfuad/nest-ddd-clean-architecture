import { UserEntity } from 'src/modules/user/web/entities/user.entity';
import { FindAllUserQueryDto } from '../../web/dto/findall-user.query-dto';

export interface FindAllUserService {
  findAll(findAllUserQueryDto: FindAllUserQueryDto): Promise<UserEntity[]>;
}
