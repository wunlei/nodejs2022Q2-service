import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { FavoritesDatabase } from 'src/db/FavoritesDB';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavoritesService {
  private static db: FavoritesDatabase;
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {
    FavoritesService.db = new FavoritesDatabase();
  }

  findAll() {
    const favs = FavoritesService.db.findAll();

    const result = {
      tracks: [],
      artists: [],
      albums: [],
    };
    result.tracks = favs.tracks.map((id) => this.trackService.findOne(id));

    result.artists = favs.artists.map((id) => this.artistService.findOne(id));

    result.albums = favs.albums.map((id) => this.albumService.findOne(id));
    return result;
  }

  addTrackToFavorites(id: string) {
    const track = this.trackService.findOne(id);

    if (!track) {
      throw new UnprocessableEntityException();
    }

    return FavoritesService.db.add('tracks', id);
  }

  removeTrackFromFavorites(id: string) {
    const track = FavoritesService.db.findOneItem('tracks', id);
    if (!track) {
      throw new NotFoundException();
    }

    return FavoritesService.db.remove('tracks', id);
  }

  addAlbumToFavorites(id: string) {
    const album = this.albumService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException();
    }

    return FavoritesService.db.add('albums', id);
  }

  removeAlbumFromFavorites(id: string) {
    const album = FavoritesService.db.findOneItem('albums', id);
    if (!album) {
      throw new NotFoundException();
    }

    return FavoritesService.db.remove('albums', id);
  }

  addArtistToFavorites(id: string) {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    return FavoritesService.db.add('artists', id);
  }

  removeArtistFromFavorites(id: string) {
    const artist = FavoritesService.db.findOneItem('artists', id);
    if (!artist) {
      throw new NotFoundException();
    }
    return FavoritesService.db.remove('artists', id);
  }

  removeFromFavorites(id: string) {
    FavoritesService.db.remove('albums', id);
    FavoritesService.db.remove('artists', id);
    FavoritesService.db.remove('tracks', id);
  }
}
