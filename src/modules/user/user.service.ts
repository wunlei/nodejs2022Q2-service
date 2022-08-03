import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '../../database/prisma.service';
import { Response, RESPONSES } from '../../constants/responses';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(
      createUserDto.password,
      Number(process.env.CRYPT_SALT),
    ).then(function (hash) {
      return hash;
    });

    const user = await this.prisma.user.create({
      data: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...createUserDto,
        password: hashedPassword,
      },
    });
    return new UserEntity(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return null;
    }
    return new UserEntity(user);
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: {
        password: updateUserDto.newPassword,
        version: { increment: 1 },
      },
    });

    return new UserEntity(user);
  }

  async remove(id: string): Promise<Response> {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return RESPONSES.REMOVED;
  }
}
