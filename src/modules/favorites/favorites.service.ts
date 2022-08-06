import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { FavoriteEntity } from './entities/favorite.entity';
import { Response, RESPONSES } from '../../constants/responses';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const favs = await this.prisma.favorites.findMany();

    if (!favs.length) {
      await this.prisma.favorites.create({ data: {} });
    }

    const fav = await this.prisma.favorites.findUnique({
      where: {
        id: '0',
      },
      include: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });

    return new FavoriteEntity(fav);
  }

  async addTrackToFavorites(id: string): Promise<Response> {
    const track = await this.prisma.track.findUnique({
      where: {
        id: id,
      },
    });

    if (!track) {
      throw new UnprocessableEntityException(RESPONSES.UNPROCESSABLE_ENTITY);
    }

    await this.prisma.track.update({
      where: { id },
      data: { favoritesId: '0' },
    });

    return RESPONSES.CREATED;
  }

  async removeTrackFromFavorites(id: string): Promise<Response> {
    const track = await this.prisma.track.findUnique({
      where: {
        id: id,
      },
    });

    if (!track) {
      throw new NotFoundException(RESPONSES.NOT_FOUND);
    }

    await this.prisma.track.update({
      where: { id },
      data: { favoritesId: null },
    });

    return RESPONSES.REMOVED;
  }

  async addAlbumToFavorites(id: string): Promise<Response> {
    const album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });

    if (!album) {
      throw new UnprocessableEntityException(RESPONSES.UNPROCESSABLE_ENTITY);
    }

    await this.prisma.album.update({
      where: { id },
      data: { favoritesId: '0' },
    });

    return RESPONSES.CREATED;
  }

  async removeAlbumFromFavorites(id: string): Promise<Response> {
    const album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });

    if (!album) {
      throw new NotFoundException(RESPONSES.NOT_FOUND);
    }

    await this.prisma.album.update({
      where: { id },
      data: { favoritesId: null },
    });

    return RESPONSES.REMOVED;
  }

  async addArtistToFavorites(id: string): Promise<Response> {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });

    if (!artist) {
      throw new UnprocessableEntityException(RESPONSES.UNPROCESSABLE_ENTITY);
    }

    await this.prisma.artist.update({
      where: { id },
      data: { favoritesId: '0' },
    });

    return RESPONSES.CREATED;
  }

  async removeArtistFromFavorites(id: string): Promise<Response> {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });

    if (!artist) {
      throw new NotFoundException(RESPONSES.NOT_FOUND);
    }

    await this.prisma.artist.update({
      where: { id },
      data: { favoritesId: null },
    });

    return RESPONSES.REMOVED;
  }
}
