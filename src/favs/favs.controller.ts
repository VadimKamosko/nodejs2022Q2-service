import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
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
  getAllFavs(@Req() req: Request): Promise<Fav> {
    const userId = req.user['sub'];
    return this.favsService.getAll(userId);
  }
  @UseGuards(AuthGuard('JWT'))
  @Post('/track/:id')
  addnewfavstrack(@Param('id') id, @Req() req: Request): Promise<Track> {
    const userId = req.user['sub'];
    return this.favsService.addfavTrack(id, userId);
  }
  @UseGuards(AuthGuard('JWT'))
  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removefavstrack(@Param('id') id, @Req() req: Request) {
    const userId = req.user['sub'];
    await this.favsService.removeFavTrack(id, userId);
  }
  @UseGuards(AuthGuard('JWT'))
  @Post('/album/:id')
  addnewfavAlbum(@Param('id') id, @Req() req: Request): Promise<Album> {
    const userId = req.user['sub'];
    return this.favsService.addfavAlbum(id, userId);
  }
  @UseGuards(AuthGuard('JWT'))
  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removefavsAlbum(@Param('id') id, @Req() req: Request) {
    const userId = req.user['sub'];
    await this.favsService.removeFavAlbum(id, userId);
  }
  @UseGuards(AuthGuard('JWT'))
  @Post('/artist/:id')
  addnewfavArtist(@Param('id') id, @Req() req: Request): Promise<Artist> {
    const userId = req.user['sub'];
    return this.favsService.addfavArtist(id, userId);
  }
  @UseGuards(AuthGuard('JWT'))
  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removefavsArtist(@Param('id') id, @Req() req: Request) {
    const userId = req.user['sub'];
    await this.favsService.removeFavArtist(id, userId);
  }
}
