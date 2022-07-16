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
import { Artist } from './DTO/full-arist-dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistServise: ArtistService) {}
  @Get()
  getAll():Promise<Artist[]> {
    return this.artistServise.getAll();
  }
  @Get(':id')
  getById(@Param('id') id): Promise<Artist> {
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async renove(@Param('id') id) {
    await this.artistServise.remove(id);
  }
}
