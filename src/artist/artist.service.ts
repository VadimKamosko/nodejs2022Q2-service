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
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistSchema } from 'src/entities/artist-entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistSchema)
    private artRep: Repository<ArtistSchema>,

    @Inject(forwardRef(() => FavsService))
    private readonly favService: FavsService,

    private readonly trackSer: TrackService,

    private readonly albServ: AlbumService,
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

    return this.artRep.save({ id: id, ...body });
  }
}
