import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlbumEntity } from './entities/album.entity';
import { AlbumDto } from './dto/album.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../track/track.service';
import { InMemoryDatabase } from '../../inmemory-db/InMemoryDB';

@Injectable()
export class AlbumService {
  private static db: InMemoryDatabase<AlbumEntity>;

  constructor(
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {
    AlbumService.db = new InMemoryDatabase<AlbumEntity>();
  }

  create(createAlbumDto: AlbumDto) {
    const data = {
      id: uuidv4(),
      artistId: null,
      ...createAlbumDto,
    };

    return AlbumService.db.create(data);
  }

  findAll() {
    return AlbumService.db.findAll();
  }

  findOne(id: string) {
    return AlbumService.db.findOne(id);
  }

  update(id: string, updateAlbumDto: AlbumDto) {
    const album = {
      artistId: null,
      ...updateAlbumDto,
      id,
    };
    return AlbumService.db.update(id, album);
  }

  remove(id: string) {
    const tracks = this.trackService.findAll();

    tracks.forEach((track) => {
      if (track.albumId === id) {
        const updatedTrack = { ...track, albumId: null };
        this.trackService.update(track.id, updatedTrack);
      }
    });

    this.favoritesService.removeFromFavorites(id);
    return AlbumService.db.delete(id);
  }
}
