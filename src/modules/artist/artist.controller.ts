import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import EXCEPTIONS from '../../constants/exceptions';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistsService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: ArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException(EXCEPTIONS.NOT_FOUND);
    }

    return artist;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: ArtistDto,
  ) {
    this.findOne(id);
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.findOne(id);
    return this.artistsService.remove(id);
  }
}
