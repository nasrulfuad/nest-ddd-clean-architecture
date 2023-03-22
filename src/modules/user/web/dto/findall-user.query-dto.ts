import { IsOptional, IsString } from 'class-validator';

export class FindAllUserQueryDto {
  @IsOptional()
  @IsString()
  readonly name: string;
}
