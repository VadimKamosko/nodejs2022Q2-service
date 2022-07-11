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
  getbyId(@Param('id') id): Promise<CreateAlbumDTO> {
    return this.albumservice.getById(id);
  }
  @Post()
  create(@Body() body: CreateAlbumDTO): CreateAlbumDTO {
    return this.albumservice.create(body);
  }
  @Put(':id')
  update(
    @Param('id') id,
    @Body() body: CreateAlbumDTO,
  ): Promise<CreateAlbumDTO> {
    return this.albumservice.update(id, body);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id) {
    await this.albumservice.remove(id);
  }
}
