import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Album } from 'src/album/DTO/album';
import { Artist } from 'src/artist/DTO/full-arist-dto';
import { Track } from 'src/track/DTO/Track';
import { Fav } from './DTO/create-favs-dto';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @UseGuards(AuthGuard('JWT'))
  @Get()
  getAllFavs(): Promise<Fav> {
    return this.favsService.getAll();
  }
  @UseGuards(AuthGuard('JWT'))
  @Post('/track/:id')
  addnewfavstrack(@Param('id') id): Promise<Track> {
    return this.favsService.addfavTrack(id);
  }
  @UseGuards(AuthGuard('JWT'))
  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removefavstrack(@Param('id') id) {
    await this.favsService.removeFavTrack(id);
  }
  @UseGuards(AuthGuard('JWT'))
  @Post('/album/:id')
  addnewfavAlbum(@Param('id') id): Promise<Album> {
    return this.favsService.addfavAlbum(id);
  }
  @UseGuards(AuthGuard('JWT'))
  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removefavsAlbum(@Param('id') id) {
    await this.favsService.removeFavAlbum(id);
  }
  @UseGuards(AuthGuard('JWT'))
  @Post('/artist/:id')
  addnewfavArtist(@Param('id') id): Promise<Artist> {
    return this.favsService.addfavArtist(id);
  }
  @UseGuards(AuthGuard('JWT'))
  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removefavsArtist(@Param('id') id) {
    await this.favsService.removeFavArtist(id);
  }
}
