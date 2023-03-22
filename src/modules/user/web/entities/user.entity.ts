import { Entity } from 'src/common/interfaces/entity';

export interface UserEntity extends Entity {
  name: string;
  email: string;
  password: string;
  hashPassword(): Promise<void>;
  comparePassword(plainPassword: string): Promise<boolean>;
}
