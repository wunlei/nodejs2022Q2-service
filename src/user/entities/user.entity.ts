import { Exclude } from 'class-transformer';

export default class UserEntity {
  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
