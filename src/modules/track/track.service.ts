import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { TrackEntity } from './entities/track.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { InMemoryDatabase } from '../../inmemory-db/InMemoryDB';

@Injectable()
export class TrackService {
  private static db: InMemoryDatabase<TrackEntity>;

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {
    TrackService.db = new InMemoryDatabase<TrackEntity>();
  }

  create(createTrackDto: TrackDto) {
    const data = {
      id: uuidv4(),
      artistId: null,
      albumId: null,
      ...createTrackDto,
    };
    return TrackService.db.create(data);
  }

  findAll() {
    return TrackService.db.findAll();
  }

  findOne(id: string) {
    return TrackService.db.findOne(id);
  }

  update(id: string, updateTrackDto: TrackDto) {
    const track = {
      artistId: null,
      albumId: null,
      ...updateTrackDto,
      id,
    };

    return TrackService.db.update(id, track);
  }

  remove(id: string) {
    this.favoritesService.removeFromFavorites(id);
    return TrackService.db.delete(id);
  }
}
