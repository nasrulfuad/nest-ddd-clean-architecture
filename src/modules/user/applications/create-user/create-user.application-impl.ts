import { UserUseCase } from '@module-user/interfaces/user-usecase';
import { CreateUserService } from '@module-user/services/create-user/create-user.service';
import { CreateUserDto } from '@module-user/web/dto/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserApplication } from './create-user.application';

@Injectable()
export class CreateUserApplicationImpl implements CreateUserApplication {
  constructor(
    @Inject(UserUseCase.services.CreateUserService)
    private createUserService: CreateUserService,
  ) {}

  async execute(request: CreateUserDto) {
    return this.createUserService.create(request);
  }
}
