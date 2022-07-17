import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsString()
  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
