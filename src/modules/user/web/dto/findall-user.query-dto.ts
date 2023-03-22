import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@common/dto/pagination.dto';

export class FindAllUserQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly name?: string;
}
