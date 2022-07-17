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
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';
import EXCEPTIONS from '../../constants/exceptions';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumsService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: AlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException(EXCEPTIONS.NOT_FOUND);
    }

    return album;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: AlbumDto,
  ) {
    this.findOne(id);
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.findOne(id);
    return this.albumsService.remove(id);
  }
}
