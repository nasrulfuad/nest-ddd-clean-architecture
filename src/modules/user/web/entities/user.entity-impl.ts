import { User } from './user.entity';

export class UserImpl implements User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
