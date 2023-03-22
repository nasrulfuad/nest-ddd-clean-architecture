import { CreateUserDto } from 'src/modules/user/web/dto/create-user.dto';
import { UserEntity } from 'src/modules/user/web/entities/user.entity';

export interface CreateUserService {
  create(createUserDto: CreateUserDto): Promise<UserEntity>;
}
