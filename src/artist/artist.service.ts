import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDatabase } from 'src/db/InMemoryDB';
import ArtistEntity from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private static db: InMemoryDatabase<ArtistEntity>;
  constructor() {
    ArtistService.db = new InMemoryDatabase<ArtistEntity>();
  }

  create(createArtistDto: CreateArtistDto) {
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

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = {
      id,
      ...updateArtistDto,
    };
    return ArtistService.db.update(id, artist);
  }

  remove(id: string) {
    return ArtistService.db.delete(id);
  }
}
