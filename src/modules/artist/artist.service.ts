import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { PrismaService } from '../../database/prisma.service';
import { ArtistEntity } from './entities/artist.entity';
import { Response, RESPONSES } from '../../constants/responses';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: ArtistDto) {
    const artist = await this.prisma.artist.create({ data: createArtistDto });
    return new ArtistEntity(artist);
  }

  async findAll() {
    const artists = await this.prisma.artist.findMany();

    return artists.map((album) => new ArtistEntity(album));
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });
    if (!artist) {
      return null;
    }
    return new ArtistEntity(artist);
  }

  async update(id: string, updateArtistDto: ArtistDto) {
    const artist = await this.prisma.artist.update({
      where: {
        id: id,
      },
      data: {
        ...updateArtistDto,
      },
    });
    return new ArtistEntity(artist);
  }

  async remove(id: string): Promise<Response> {
    await this.prisma.artist.delete({
      where: {
        id: id,
      },
    });

    return RESPONSES.REMOVED;
  }
}
