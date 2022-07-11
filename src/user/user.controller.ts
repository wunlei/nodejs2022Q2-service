import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  ParseUUIDPipe,
  HttpCode,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException({
        error: 'Not Found',
        message: `User with id ${id} was not found`,
      });
    }

    return user;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    const user = this.findOne(id);

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException({
        message: 'Old password is incorrect',
        error: 'Bad Request',
      });
    }

    return this.usersService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.findOne(id);

    return this.usersService.remove(id);
  }
}
