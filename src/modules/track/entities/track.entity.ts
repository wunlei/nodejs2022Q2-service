import { Exclude } from 'class-transformer';

export class TrackEntity {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  @Exclude()
  favoritesId: string | null;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
