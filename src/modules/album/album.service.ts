import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './entities/album.entity';
import { AlbumDto } from './dto/album.dto';
import { PrismaService } from '../../database/prisma.service';
import { Response, RESPONSES } from '../../constants/responses';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: AlbumDto) {
    const album = await this.prisma.album.create({ data: createAlbumDto });
    return new AlbumEntity(album);
  }

  async findAll() {
    const albums = await this.prisma.album.findMany();

    return albums.map((album) => new AlbumEntity(album));
  }

  async findOne(id: string): Promise<AlbumEntity | null> {
    const album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });

    if (!album) {
      return null;
    }

    return new AlbumEntity(album);
  }

  async update(id: string, updateAlbumDto: AlbumDto) {
    const album = await this.prisma.album.update({
      where: {
        id: id,
      },
      data: {
        artistId: null,
        ...updateAlbumDto,
      },
    });
    return new AlbumEntity(album);
  }

  async remove(id: string): Promise<Response> {
    await this.prisma.album.delete({
      where: {
        id: id,
      },
    });

    return RESPONSES.REMOVED;
  }
}
