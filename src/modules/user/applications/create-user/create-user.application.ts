import { CreateUserDto } from 'src/modules/user/web/dto/create-user.dto';
import { User } from 'src/modules/user/web/entities/user.entity';

export interface CreateUserApplication {
  execute(request: CreateUserDto): Promise<User>;
}
