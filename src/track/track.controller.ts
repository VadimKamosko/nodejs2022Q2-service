import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackcCreateDTO } from './DTO/create-track-dto';
import { Track } from './DTO/Track';

import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackservice: TrackService) {}
  @Get()
  findAll(): Track[] {
    return this.trackservice.getAll();
  }
  @Get(':id')
  getById(@Param('id') id): Promise<Track> {
    return this.trackservice.getById(id);
  }
  @Post()
  create(@Body() track: TrackcCreateDTO): Track {
    return this.trackservice.create(track);
  }
  @Put(':id')
  update(@Param('id') id, @Body() track: TrackcCreateDTO): Promise<Track> {
    return this.trackservice.update(id, track);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id) {
    await this.trackservice.remove(id);
  }
}
