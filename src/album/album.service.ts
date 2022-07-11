import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlbumDTO } from './DTO/create-album-dto';
import { albums } from 'src/memoryBd/bd';
import { v4 as uuidv4 } from 'uuid';
import { ArtistService } from 'src/artist/artist.service';

const artSer = new ArtistService();

@Injectable()
export class AlbumService {
  getAll(): CreateAlbumDTO[] {
    return albums;
  }
  getById(id: string): CreateAlbumDTO {
    return albums.find((item) => item.id === id);
  }
  create(albumsB: CreateAlbumDTO): CreateAlbumDTO {
    if (!artSer.getById(albumsB.artistId)) throw new BadRequestException();
    albums.push({
      id: uuidv4(),
      ...albumsB,
    });
    return albums[albums.length - 1];
  }
  remove(id: string): string {
    const index = albums.findIndex((item) => item.id == id);
    albums.splice(index, 1);
    return `Deleted ${id}`;
  }
  update(id: string, albumsB: CreateAlbumDTO) {
    albums.map((item: CreateAlbumDTO) => {
      if (item.id == id) {
        if (albumsB.name) item.name = albumsB.name;
        if (albumsB.artistId) item.artistId = albumsB.artistId;
        if (albumsB.year) item.year = albumsB.year;
      }
      return item;
    });
    return `Update ${id}`;
  }
}
