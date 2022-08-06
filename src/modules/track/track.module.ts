import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, FavoritesService, ArtistService, AlbumService],
})
export class TrackModule {}
