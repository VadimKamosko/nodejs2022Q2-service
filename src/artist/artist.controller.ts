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
import { ArtistService } from './artist.service';
import { CreateArtistDTO } from './DTO/create-artist-dto';
import { Artist } from './DTO/full-arist-dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistServise: ArtistService) {}

  @UseGuards(AuthGuard('JWT'))
  @Get()
  getAll(): Promise<Artist[]> {
    return this.artistServise.getAll();
  }
  @UseGuards(AuthGuard('JWT'))
  @Get(':id')
  getById(@Param('id') id): Promise<Artist> {
    return this.artistServise.getById(id);
  }
  @UseGuards(AuthGuard('JWT'))
  @Put(':id')
  update(@Param('id') id, @Body() body: CreateArtistDTO) {
    return this.artistServise.update(id, body);
  }
  @UseGuards(AuthGuard('JWT'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateArtistDTO) {
    return this.artistServise.create(body);
  }
  @UseGuards(AuthGuard('JWT'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async renove(@Param('id') id) {
    await this.artistServise.remove(id);
  }
}
