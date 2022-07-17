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
import EXCEPTIONS from '../../constants/exceptions';

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
      throw new NotFoundException(EXCEPTIONS.NOT_FOUND);
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
      throw new ForbiddenException(EXCEPTIONS.FORBIDDEN_PASSWORD);
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
