import { Exclude } from 'class-transformer';

export class AlbumEntity {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  @Exclude()
  favoritesId: string | null;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
