import { Inject, Injectable } from '@nestjs/common';
import { UserUseCase } from 'src/modules/user/interfaces/user-usecase';
import { CreateUserService } from 'src/modules/user/services/create-user/create-user.service';
import { CreateUserDto } from '../../web/dto/create-user.dto';
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
