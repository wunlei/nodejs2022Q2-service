import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { TrackService } from './track.service';
import EXCEPTIONS from '../../constants/exceptions';

@Controller('track')
export class TrackController {
  constructor(private readonly tracksService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: TrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException(EXCEPTIONS.NOT_FOUND);
    }

    return track;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: TrackDto,
  ) {
    this.findOne(id);
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.findOne(id);

    return this.tracksService.remove(id);
  }
}
