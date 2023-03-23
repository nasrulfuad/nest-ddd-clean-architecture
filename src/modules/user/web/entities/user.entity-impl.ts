import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'users' })
export class UserEntityImpl implements UserEntity {
  constructor(name: string, email: string, password: string) {
    this.email = email;
    this.name = name;
    this.password = password;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  async hashPassword() {
    /** Here you can hash the password before inserting to the data source */
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
