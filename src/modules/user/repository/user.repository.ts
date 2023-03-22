import { CreateUserDto } from '@module-user/web/dto/create-user.dto';
import { FindAllUserQueryDto } from '@module-user/web/dto/findall-user.query-dto';
import { UserEntity } from '@module-user/web/entities/user.entity';

export interface UserRepository {
  create(createUserDto: CreateUserDto): Promise<UserEntity>;
  findAll(
    findAllUserQueryDto: FindAllUserQueryDto,
  ): Promise<[UserEntity[], number]>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
