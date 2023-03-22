import { Module, Provider } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserUseCase } from './interfaces/user-usecase';
import { CreateUserApplicationImpl } from './applications/create-user/create-user.application-impl';
import { CreateUserServiceImpl } from './services/create-user/create-user.service-impl';

const createUser: Provider[] = [
  {
    provide: UserUseCase.applications.CreateUserApplication,
    useClass: CreateUserApplicationImpl,
  },
  {
    provide: UserUseCase.services.CreateUserService,
    useClass: CreateUserServiceImpl,
  },
];

@Module({
  controllers: [UserController],
  providers: [
    ...createUser
  ]
})
export class UserModule {}
