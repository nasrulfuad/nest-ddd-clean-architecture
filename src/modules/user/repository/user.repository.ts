import { CreateUserDto } from '../web/dto/create-user.dto';
import { FindAllUserQueryDto } from '../web/dto/findall-user.query-dto';
import { User } from '../web/entities/user.entity';

export interface UserRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(findAllUserQueryDto: FindAllUserQueryDto): Promise<User[]>;
}
