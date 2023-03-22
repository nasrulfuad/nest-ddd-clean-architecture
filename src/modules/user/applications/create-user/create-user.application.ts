import { CreateUserDto } from '@module-user/web/dto/create-user.dto';
import { UserEntity } from '@module-user/web/entities/user.entity';

export interface CreateUserApplication {
  execute(request: CreateUserDto): Promise<UserEntity>;
}
