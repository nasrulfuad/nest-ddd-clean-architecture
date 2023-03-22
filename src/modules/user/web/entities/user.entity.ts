import { Entity } from 'src/common/interfaces/entity';

export interface User extends Entity {
  name: string;
  email: string;
  password: string;
}
