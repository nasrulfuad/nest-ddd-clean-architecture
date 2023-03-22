import { CreateUserDto } from '@module-user/web/dto/create-user.dto';
import { UserEntity } from '@module-user/web/entities/user.entity';

export interface CreateUserApplication {
  execute(createUserDto: CreateUserDto): Promise<UserEntity>;
}
