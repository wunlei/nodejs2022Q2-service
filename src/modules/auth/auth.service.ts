import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RESPONSES } from '../../constants/responses';
import { TokenRefreshDto } from './dto/token-refresh.dto';
import { IJWT, IPayload } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(createUserDto: CreateUserDto): Promise<IPayload> {
    const users = await this.prisma.user.findMany();
    const validUsers = users.filter(async (user) => {
      if (user.login === createUserDto.login) {
        const isPasswordValid = await compare(
          createUserDto.password,
          user.password,
        ).then(function (result) {
          return result;
        });
        return isPasswordValid;
      }
    });

    if (!validUsers.length) {
      throw new ForbiddenException(RESPONSES.FORBIDDEN_USER);
    }

    const payload = {
      userId: validUsers[0].id,
      login: validUsers[0].login,
    };

    return payload;
  }

  async login(createUserDto: CreateUserDto) {
    const payload = await this.validateUser(createUserDto);

    return this.generateTokens(payload);
  }

  generateTokens(payload: IPayload) {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async refresh(tokenRefreshDto: TokenRefreshDto) {
    try {
      const user: IJWT = await this.jwtService.verify(
        tokenRefreshDto.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );

      const payload = {
        userId: user.userId,
        login: user.login,
      };

      return this.generateTokens(payload);
    } catch (error) {
      throw new ForbiddenException(RESPONSES.FORBIDDEN_TOKEN);
    }
  }
}
