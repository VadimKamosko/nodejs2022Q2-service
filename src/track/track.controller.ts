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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TrackcCreateDTO } from './DTO/create-track-dto';
import { Track } from './DTO/Track';

import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackservice: TrackService) {}
  @UseGuards(AuthGuard('JWT'))
  @Get()
  findAll(): Promise<Track[]> {
    return this.trackservice.getAll();
  }
  @UseGuards(AuthGuard('JWT'))
  @Get(':id')
  getById(@Param('id') id): Promise<Track> {
    return this.trackservice.getById(id);
  }
  @UseGuards(AuthGuard('JWT'))
  @Post()
  create(@Body() track: TrackcCreateDTO): Promise<Track> {
    return this.trackservice.create(track);
  }
  @UseGuards(AuthGuard('JWT'))
  @Put(':id')
  update(@Param('id') id, @Body() track: TrackcCreateDTO): Promise<Track> {
    return this.trackservice.update(id, track);
  }
  @UseGuards(AuthGuard('JWT'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id) {
    await this.trackservice.remove(id);
  }
}
