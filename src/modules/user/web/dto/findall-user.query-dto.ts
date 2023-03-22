import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class FindAllUserQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly name?: string;
}
