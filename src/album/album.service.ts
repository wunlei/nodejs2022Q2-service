import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryDatabase } from 'src/db/InMemoryDB';
import { v4 as uuidv4 } from 'uuid';
import AlbumEntity from './entities/album.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from 'src/track/track.service';

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

  create(createAlbumDto: CreateAlbumDto) {
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

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
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
