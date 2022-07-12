import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryDatabase } from 'src/db/InMemoryDB';
import { v4 as uuidv4 } from 'uuid';
import AlbumEntity from './entities/album.entity';

@Injectable()
export class AlbumService {
  private static db: InMemoryDatabase<AlbumEntity>;

  constructor() {
    AlbumService.db = new InMemoryDatabase<AlbumEntity>();
  }

  create(createAlbumDto: CreateAlbumDto) {
    const data = {
      id: uuidv4(),
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
      id,
      ...updateAlbumDto,
    };
    return AlbumService.db.update(id, album);
  }

  remove(id: string) {
    return AlbumService.db.delete(id);
  }
}
