import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDTO } from './DTO/create-album-dto';
import { albums } from 'src/memoryBd/bd';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { ArtistService } from 'src/artist/artist.service';

const artSer = new ArtistService();

@Injectable()
export class AlbumService {
  getAll(): CreateAlbumDTO[] {
    return albums;
  }
  async getById(id: string): Promise<CreateAlbumDTO> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const album = await albums.find((item) => item.id === id);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }
  create(albumsB: CreateAlbumDTO): CreateAlbumDTO {   
    // if (!artSer.getById(albumsB.artistId)) throw new BadRequestException();
    const alb = {
      id: uuidv4(),
      ...albumsB,
    };
    albums.push(alb);
    
    return alb;
  }
  async remove(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const index = await albums.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    albums.splice(index, 1);
  }
  async update(id: string, albumsB: CreateAlbumDTO) {
    const albUpdate = await this.getById(id);

    if (albumsB.name) albUpdate.name = albumsB.name;
    if (albumsB.artistId) albUpdate.artistId = albumsB.artistId;
    if (albumsB.year) albUpdate.year = albumsB.year;

    return albUpdate;
  }
}
