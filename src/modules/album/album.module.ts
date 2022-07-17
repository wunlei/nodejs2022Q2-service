import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { ArtistService } from '../artist/artist.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../track/track.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, FavoritesService, ArtistService, TrackService],
})
export class AlbumModule {}
