import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDTO } from './DTO/create-album-dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumservice: AlbumService) {}
  @Get()
  getall(): CreateAlbumDTO[] {
    return this.albumservice.getAll();
  }
  @Get(':id')
  getbyId(@Param('id') id): CreateAlbumDTO {
    return this.albumservice.getById(id);
  }
  @Post()
  create(@Body() body: CreateAlbumDTO): CreateAlbumDTO {
    return this.albumservice.create(body);
  }
  @Put(':id')
  update(@Param('id') id, @Body() body: CreateAlbumDTO): string {
    return this.albumservice.update(id, body);
  }
  @Delete(':id')
  remove(@Param('id') id): string {
    return this.albumservice.remove(id);
  }
}
