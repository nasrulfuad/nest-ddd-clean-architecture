import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserApplicationImpl } from './applications/create-user/create-user.application-impl';
import { DeleteUserApplicationImpl } from './applications/delete-user/delete-user.application-impl';
import { FindAllUserApplicationImpl } from './applications/findall-user/findall-user.application-impl';
import { FindOneUserApplicationImpl } from './applications/findone-user/findone-user.application-impl';
import { UpdateUserApplicationImpl } from './applications/update-user/update-user.application-impl';
import { UserUseCase } from './constants/user-usecase';
import { UserRepositoryImpl } from './repository/user.repository-impl';
import { CreateUserServiceImpl } from './services/create-user/create-user.service-impl';
import { DeleteUserServiceImpl } from './services/delete-user/delete-user.service-impl';
import { FindAllUserServiceImpl } from './services/findall-user/findall-user.service-impl';
import { FindOneUserServiceImpl } from './services/findone-user/findone-user.service-impl';
import { UpdateUserServiceImpl } from './services/update-user/update-user.service-impl';
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
    ...findOneUser(),
    ...deleteUser(),
    ...updateUser(),
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

function findOneUser(): Provider[] {
  return [
    {
      provide: UserUseCase.applications.FindOneUserApplication,
      useClass: FindOneUserApplicationImpl,
    },
    {
      provide: UserUseCase.services.FindOneUserService,
      useClass: FindOneUserServiceImpl,
    },
  ];
}

function deleteUser(): Provider[] {
  return [
    {
      provide: UserUseCase.applications.DeleteUserApplication,
      useClass: DeleteUserApplicationImpl,
    },
    {
      provide: UserUseCase.services.DeleteUserService,
      useClass: DeleteUserServiceImpl,
    },
  ];
}

function updateUser(): Provider[] {
  return [
    {
      provide: UserUseCase.applications.UpdateUserApplication,
      useClass: UpdateUserApplicationImpl,
    },
    {
      provide: UserUseCase.services.UpdateUserService,
      useClass: UpdateUserServiceImpl,
    },
  ];
}
