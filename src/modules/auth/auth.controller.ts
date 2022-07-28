import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { TokenRefreshDto } from './dto/token-refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UserService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {}

  @Post('/refresh')
  async refresh(@Body() tokenRefreshDto: TokenRefreshDto) {}
}
