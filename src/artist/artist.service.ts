import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDTO } from './DTO/create-artist-dto';
import { Artist } from './DTO/full-arist-dto';
import { validate as uuidValidate } from 'uuid';

import { InjectRepository } from '@nestjs/typeorm';
import { ArtistSchema } from 'src/entities/artist-entity';
import { Repository } from 'typeorm';
import { TrackSchema } from 'src/entities/track-entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistSchema)
    private artRep: Repository<ArtistSchema>,

    @InjectRepository(TrackSchema)
    private trRep: Repository<TrackSchema>,
  ) {}

  async getAll(): Promise<Artist[]> {
    return await this.artRep.find();
  }

  async getById(id: string): Promise<Artist> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const artist = await this.artRep.findOneBy({ id });
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }
  async create(body: CreateArtistDTO): Promise<Artist> {
    const newArt = await this.artRep.insert(body);
    return this.getById(newArt.identifiers[0].id);
  }
  async remove(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const index = await this.artRep.delete({ id });
    if (!index.affected) throw new NotFoundException('Artist not found');
    
    // this.favService.removeFavArtist(id);
    // this.trackSer.removeCascadeArt(id);
    // this.albServ.removeArtCascade(id);
  }
  async update(id: string, body: CreateArtistDTO): Promise<Artist> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');

    const result = await this.artRep
      .createQueryBuilder()
      .update({ ...body })
      .where({ id })
      .returning('*')
      .execute();

    if (result.affected) return result.raw[0];

    throw new NotFoundException();
  }
}
