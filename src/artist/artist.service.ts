import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { artists } from 'src/memoryBd/bd';
import { CreateArtistDTO } from './DTO/create-artist-dto';
import { Artist } from './DTO/full-arist-dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favService: FavsService,
  ) {}

  getAll(): Artist[] {
    return artists;
  }

  async getById(id: string): Promise<Artist> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const artist = await artists.find((item) => item.id === id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }
  create(body: CreateArtistDTO): Artist {
    const art = {
      id: uuidv4(),
      ...body,
    };
    artists.push(art);
    return art;
  }
  async remove(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const index = await artists.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('Artist not found');
    artists.splice(index, 1);
    this.favService.removeFavArtist(id);
  }
  async update(id: string, body: CreateArtistDTO): Promise<Artist> {
    const art = await this.getById(id);

    if (body.name) art.name = body.name;
    if (body.grammy) art.grammy = body.grammy;

    return art;
  }
}
