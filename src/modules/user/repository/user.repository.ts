import { CreateUserDto } from '../web/dto/create-user.dto';
import { FindAllUserQueryDto } from '../web/dto/findall-user.query-dto';
import { UserEntity } from '../web/entities/user.entity';

export interface UserRepository {
  create(createUserDto: CreateUserDto): Promise<UserEntity>;
  findAll(findAllUserQueryDto: FindAllUserQueryDto): Promise<UserEntity[]>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
