import { Exclude } from 'class-transformer';

export class ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;

  @Exclude()
  favoritesId: string | null;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
