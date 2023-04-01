import { UserEntity } from '@module-user/web/entities/user.entity';
import { UpdateUserDto } from '@module-user/web/dto/update-user.dto';

export interface UpdateUserApplication {
  execute(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
}
