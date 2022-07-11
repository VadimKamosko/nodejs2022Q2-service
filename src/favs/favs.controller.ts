import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatefavsDTO } from './DTO/create-favs-dto';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAllFavs(): CreatefavsDTO {
    return this.favsService.getAll();
  }

  @Post('/track/:id')
  addnewfavstrack(@Param('id') id): string | boolean {
    return this.favsService.addfavTrack(id);
  }
  @Delete('/track/:id')
  removefavstrack(@Param('id') id) {
    this.favsService.removeFavTrack(id);
  }
  @Post('/album/:id')
  addnewfavAlbum(@Param('id') id): string {
    return this.favsService.addfavAlbum(id);
  }
  @Delete('/album/:id')
  removefavsAlbum(@Param('id') id) {
    this.favsService.removeFavAlbum(id);
  }
  @Post('/artist/:id')
  addnewfavArtist(@Param('id') id): string {
    return this.favsService.addfavArtist(id);
  }
  @Delete('/artist/:id')
  removefavsArtist(@Param('id') id) {
    this.favsService.removeFavArtist(id);
  }
}
