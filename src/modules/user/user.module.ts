import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserApplicationImpl } from './applications/create-user/create-user.application-impl';
import { FindAllUserApplicationImpl } from './applications/findall-user/findall-user.application-impl';
import { UserUseCase } from './interfaces/user-usecase';
import { UserRepositoryImpl } from './repository/user.repository-impl';
import { CreateUserServiceImpl } from './services/create-user/create-user.service-impl';
import { FindAllUserServiceImpl } from './services/findall-user/findall-user.service-impl';
import { UserController } from './user.controller';
import { UserEntityImpl } from './web/entities/user.entity-impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntityImpl])],
  controllers: [UserController],
  providers: [
    {
      provide: UserUseCase.repositories.UserRepository,
      useClass: UserRepositoryImpl,
    },
    ...createUser(),
    ...findAllUser(),
  ],
})
export class UserModule {}

function createUser(): Provider[] {
  return [
    {
      provide: UserUseCase.applications.CreateUserApplication,
      useClass: CreateUserApplicationImpl,
    },
    {
      provide: UserUseCase.services.CreateUserService,
      useClass: CreateUserServiceImpl,
    },
  ];
}

function findAllUser(): Provider[] {
  return [
    {
      provide: UserUseCase.applications.FindAllUserApplication,
      useClass: FindAllUserApplicationImpl,
    },
    {
      provide: UserUseCase.services.FindAllUserService,
      useClass: FindAllUserServiceImpl,
    },
  ];
}
