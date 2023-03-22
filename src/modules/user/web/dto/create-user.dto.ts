import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  readonly username: string;

  @IsString()
  @MinLength(3)
  readonly name: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  @MinLength(5)
  readonly password: string;
}
