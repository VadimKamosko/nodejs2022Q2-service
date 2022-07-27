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
import { AlbumService } from './album.service';
import { Album } from './DTO/album';
import { CreateAlbumDTO } from './DTO/create-album-dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumservice: AlbumService) {}
  @UseGuards(AuthGuard('JWT'))
  @Get()
  getall(): Promise<Album[]> {
    return this.albumservice.getAll();
  }
  @UseGuards(AuthGuard('JWT'))
  @Get(':id')
  getbyId(@Param('id') id): Promise<Album> {
    return this.albumservice.getById(id);
  }
  @UseGuards(AuthGuard('JWT'))
  @Post()
  create(@Body() body: CreateAlbumDTO): Promise<Album> {
    return this.albumservice.create(body);
  }
  @UseGuards(AuthGuard('JWT'))
  @Put(':id')
  update(@Param('id') id, @Body() body: CreateAlbumDTO): Promise<Album> {
    return this.albumservice.update(id, body);
  }
  @UseGuards(AuthGuard('JWT'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id) {
    await this.albumservice.remove(id);
  }
}
