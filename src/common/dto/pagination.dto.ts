import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly perPage?: number = 10;

  get skip() {
    return (this.page - 1) * this.perPage;
  }
}
