import { Injectable } from '@nestjs/common';
import { InMemoryDatabase } from 'src/db/InMemoryDB';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import UserEntity from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private static db: InMemoryDatabase<UserEntity>;
  constructor() {
    UserService.db = new InMemoryDatabase<UserEntity>();
  }

  create(createUserDto: CreateUserDto) {
    const data = {
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return new UserEntity(UserService.db.create(data));
  }

  findAll() {
    const users = UserService.db.findAll();
    return users.map((user) => new UserEntity(user));
  }

  findOne(id: string) {
    return new UserEntity(UserService.db.findOne(id));
  }

  update(id: string, updateUserDto: UpdatePasswordDto, user: UserEntity) {
    const updateData = {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    return new UserEntity(UserService.db.update(id, updateData));
  }

  remove(id: string) {
    return UserService.db.delete(id);
  }
}
