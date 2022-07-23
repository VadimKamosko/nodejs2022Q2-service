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
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  getAll():Promise<Artist[]> {
    return this.artistService.getAll();
  }
  @Get(':id')
  getById(@Param('id') id): Promise<Artist> {
    return this.artistService.getById(id);
  }
  @Put(':id')
  update(@Param('id') id, @Body() body: CreateArtistDTO) {
    return this.artistService.update(id, body);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateArtistDTO) {
    return this.artistService.create(body);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async renove(@Param('id') id) {
    await this.artistService.remove(id);
  }
}
