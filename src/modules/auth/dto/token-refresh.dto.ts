import { IsNotEmpty, IsString } from 'class-validator';

export class TokenRefreshDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
