import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
