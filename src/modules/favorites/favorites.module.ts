import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, AlbumService, ArtistService, TrackService],
})
export class FavoritesModule {}
