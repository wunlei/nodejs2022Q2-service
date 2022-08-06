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
import { RESPONSES } from '../../constants/responses';

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
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException(RESPONSES.NOT_FOUND);
    }

    return track;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: TrackDto,
  ) {
    await this.findOne(id);
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.findOne(id);

    return this.tracksService.remove(id);
  }
}
