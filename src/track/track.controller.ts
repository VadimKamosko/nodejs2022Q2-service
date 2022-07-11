import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackcCreateDTO } from './DTO/create-track-dto';
import { UpdateTrackDTO } from './DTO/update-track-dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackservice: TrackService) {}
  @Get()
  findAll(): TrackcCreateDTO[] {
    return this.trackservice.getAll();
  }
  @Get(':id')
  getById(@Param('id') id): TrackcCreateDTO {
    return this.trackservice.getById(id);
  }
  @Post()
  create(@Body() track: UpdateTrackDTO): TrackcCreateDTO {
    return this.trackservice.create(track);
  }
  @Put(':id')
  update(@Param('id') id, @Body() track: UpdateTrackDTO): string {
    return this.trackservice.update(id, track);
  }
  @Delete(':id')
  remove(@Param('id') id): string {
    return this.trackservice.remove(id);
  }
}
