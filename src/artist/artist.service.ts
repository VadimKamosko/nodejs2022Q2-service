import { Injectable, NotFoundException } from '@nestjs/common';
import { artists } from 'src/memoryBd/bd';
import { CreateArtistDTO } from './DTO/create-artist-dto';
import { FullArtistDto } from './DTO/full-arist-dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  getAll(): FullArtistDto[] {
    return artists;
  }
  getById(id: string): FullArtistDto {
    return artists.find((item) => item.id === id);
  }
  create(body: CreateArtistDTO): FullArtistDto {
    artists.push({
      id: uuidv4(),
      ...body,
    });
    return artists[artists.length - 1];
  }
  remove(id: string): string {
    const index = artists.findIndex((item) => item.id == id);
    if(!index) throw new NotFoundException()
    artists.splice(index, 1);
    return `Deleted ${id}`;
  }
  update(id: string, body: CreateArtistDTO): FullArtistDto {
    artists.map((item: FullArtistDto) => {
      if (item.id == id) {
        if (body.name) item.name = body.name;
        if (body.name) item.grammy = body.grammy;
      }
      return item;
    });
    return this.getById(id);
  }
}
