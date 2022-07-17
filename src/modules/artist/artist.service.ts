import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArtistDto } from './dto/artist.dto';
import { InMemoryDatabase } from '../../inmemory-db/InMemoryDB';
import ArtistEntity from './entities/artist.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class ArtistService {
  private static db: InMemoryDatabase<ArtistEntity>;

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {
    ArtistService.db = new InMemoryDatabase<ArtistEntity>();
  }

  create(createArtistDto: ArtistDto) {
    const data = {
      id: uuidv4(),
      ...createArtistDto,
    };
    return ArtistService.db.create(data);
  }

  findAll() {
    return ArtistService.db.findAll();
  }

  findOne(id: string) {
    return ArtistService.db.findOne(id);
  }

  update(id: string, updateArtistDto: ArtistDto) {
    const artist = {
      ...updateArtistDto,
      id,
    };
    return ArtistService.db.update(id, artist);
  }

  remove(id: string) {
    const tracks = this.trackService.findAll();

    tracks.forEach((track) => {
      if (track.artistId === id) {
        const updatedTrack = { ...track, artistId: null };
        this.trackService.update(track.id, updatedTrack);
      }
    });

    const albums = this.albumService.findAll();

    albums.forEach((album) => {
      if (album.artistId === id) {
        const updatedAlbum = { ...album, artistId: null };
        this.albumService.update(album.id, updatedAlbum);
      }
    });

    this.favoritesService.removeFromFavorites(id);
    return ArtistService.db.delete(id);
  }
}
