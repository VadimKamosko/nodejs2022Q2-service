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
import { ArtistService } from './artist.service';
import { CreateArtistDTO } from './DTO/create-artist-dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistServise: ArtistService) {}
  @Get()
  getAll() {
    return this.artistServise.getAll();
  }
  @Get(':id')
  getById(@Param('id') id) {
    return this.artistServise.getById(id);
  }
  @Put(':id')
  update(@Param('id') id, @Body() body: CreateArtistDTO) {
    return this.artistServise.update(id, body);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateArtistDTO) {
    return this.artistServise.create(body);
  }
  @Delete(':id')
  renove(@Param('id') id) {
    return this.artistServise.remove(id);
  }
}
