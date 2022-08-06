import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsUUID,
} from 'class-validator';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsInt()
  duration: number;
}
