import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDTO } from './DTO/create-album-dto';
import { albums } from 'src/memoryBd/bd';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { Album } from './DTO/album';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumSchema } from 'src/entities/album-entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumSchema)
    private albRep: Repository<AlbumSchema>,
  ) {}
  async getAll(): Promise<Album[]> {
    return await this.albRep.find();
  }
  async getById(id: string): Promise<Album> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const album = await this.albRep.findOneBy({ id });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }
  async create(albumsB: CreateAlbumDTO): Promise<Album> {
    const newAlb = await this.albRep.insert(albumsB);
    return this.getById(newAlb.identifiers[0].id);
  }
  async remove(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const index = await this.albRep.delete({ id });
    if (!index.affected) throw new NotFoundException('Album not found');
    // this.favService.removeFavAlbum(id);
    // this.trackSer.removeCascadeAlb(id);
  }
  async update(id: string, albumsB: CreateAlbumDTO) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');

    const result = await this.albRep
      .createQueryBuilder()
      .update({ ...albumsB })
      .where({ id })
      .returning('*')
      .execute();

    if (result.affected) return result.raw[0];

    throw new NotFoundException();
  }

  removeArtCascade(id: string) {
    for (let i = 0; i < albums.length; i++)
      if (albums[i].artistId === id) albums[i].artistId = null;
  }
}
