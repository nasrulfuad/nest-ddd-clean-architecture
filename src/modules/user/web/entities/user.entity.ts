import { Entity } from '@common/interfaces/entity';

export interface UserEntity extends Entity {
  name: string;
  email: string;
  age: number;
  password: string;
  hashPassword(): Promise<void>;
  comparePassword(plainPassword: string): Promise<boolean>;
}
