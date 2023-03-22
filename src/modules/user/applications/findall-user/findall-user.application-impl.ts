import { Inject, Injectable } from '@nestjs/common';
import { UserUseCase } from '../../interfaces/user-usecase';
import { FindAllUserService } from '../../services/findall-user/findall-user.service';
import { FindAllUserQueryDto } from '../../web/dto/findall-user.query-dto';
import { UserEntity } from '../../web/entities/user.entity';
import { FindAllUserApplication } from './findall-user.application';

@Injectable()
export class FindAllUserApplicationImpl implements FindAllUserApplication {
  constructor(
    @Inject(UserUseCase.services.FindAllUserService)
    private findAllUserService: FindAllUserService,
  ) {}

  execute(findAllUserQueryDto: FindAllUserQueryDto): Promise<UserEntity[]> {
    return this.findAllUserService.findAll(findAllUserQueryDto);
  }
}
