import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InMemoryDatabase } from 'src/db/InMemoryDB';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TrackService {
  private static db: InMemoryDatabase<TrackEntity>;

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {
    TrackService.db = new InMemoryDatabase<TrackEntity>();
  }

  create(createTrackDto: CreateTrackDto) {
    const data = {
      id: uuidv4(),
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

  update(id: string, updateTrackDto: UpdateTrackDto) {
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
