import { Exclude, Type } from 'class-transformer';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { AlbumEntity } from '../../album/entities/album.entity';
import { TrackEntity } from '../../track/entities/track.entity';

export class FavoriteEntity {
  @Exclude()
  id: string;
  @Type(() => ArtistEntity)
  artists: ArtistEntity[];
  @Type(() => AlbumEntity)
  albums: AlbumEntity[];
  @Type(() => TrackEntity)
  tracks: TrackEntity[];

  constructor(partial: Partial<FavoriteEntity>) {
    Object.assign(this, partial);
  }
}
