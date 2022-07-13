import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrackToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    //Server should answer with status code 422 and corresponding message if track with id === trackId doesn't exist
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    //Server should answer with status code 422 and corresponding message if track with id === trackId doesn't exist
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    //Server should answer with status code 404 and corresponding message if corresponding artist is not favorite
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  addArtistToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    //Server should answer with status code 422 and corresponding message if track with id === trackId doesn't exist
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }
}
