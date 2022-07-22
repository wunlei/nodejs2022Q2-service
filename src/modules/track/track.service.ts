import { Injectable } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { PrismaService } from '../../database/prisma.service';
import { TrackEntity } from './entities/track.entity';
import { RESPONSES, Response } from '../../constants/responses';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: TrackDto) {
    const track = await this.prisma.track.create({ data: createTrackDto });
    return new TrackEntity(track);
  }

  async findAll() {
    const tracks = await this.prisma.track.findMany();
    return tracks.map((track) => new TrackEntity(track));
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id: id,
      },
    });

    if (!track) {
      return null;
    }
    return new TrackEntity(track);
  }

  async update(id: string, updateTrackDto: TrackDto) {
    const track = await this.prisma.track.update({
      where: {
        id: id,
      },
      data: {
        artistId: null,
        albumId: null,
        ...updateTrackDto,
      },
    });
    return new TrackEntity(track);
  }

  async remove(id: string): Promise<Response> {
    await this.prisma.track.delete({
      where: {
        id: id,
      },
    });
    return RESPONSES.REMOVED;
  }
}
