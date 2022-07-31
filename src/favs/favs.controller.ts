import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Album } from 'src/album/DTO/album';
import { Artist } from 'src/artist/DTO/full-arist-dto';
import { Track } from 'src/track/DTO/Track';
import { Fav } from './DTO/create-favs-dto';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAllFavs(): Promise<Fav> {
    return this.favsService.getAll();
  }

  @Post('/track/:id')
  addnewfavstrack(@Param('id') id): Promise<Track> {
    return this.favsService.addfavTrack(id);
  }
  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removefavstrack(@Param('id') id) {
    await this.favsService.removeFavTrack(id);
  }
  @Post('/album/:id')
  addnewfavAlbum(@Param('id') id): Promise<Album> {
    return this.favsService.addfavAlbum(id);
  }
  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removefavsAlbum(@Param('id') id) {
    await this.favsService.removeFavAlbum(id);
  }
  @Post('/artist/:id')
  addnewfavArtist(@Param('id') id): Promise<Artist> {
    return this.favsService.addfavArtist(id);
  }
  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removefavsArtist(@Param('id') id) {
    await this.favsService.removeFavArtist(id);
  }
}
