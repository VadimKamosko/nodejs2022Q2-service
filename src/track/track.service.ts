import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Track } from './DTO/Track';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { TrackcCreateDTO } from './DTO/create-track-dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackSchema } from 'src/entities/track-entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackSchema)
    private TrackRep: Repository<TrackSchema>,
  ) {}
  async getAll(): Promise<Track[]> {
    return await this.TrackRep.find();
  }
  async getById(id: string): Promise<Track> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const trackFind = await this.TrackRep.findOneBy({ id });
    if (!trackFind) throw new NotFoundException('Track not found');

    return trackFind;
  }
  async create(trackB: TrackcCreateDTO): Promise<Track> {
    const newtrack = await this.TrackRep.insert({
      ...trackB,
    });
    return await this.getById(newtrack.identifiers[0].id);
  }
  async remove(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const index = await this.TrackRep.delete({ id });
    if (!index.affected) throw new NotFoundException('Track not found');
    // await this.favService.removeFavTrack(id);
  }
  async update(id: string, trackB: TrackcCreateDTO): Promise<Track> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');

    const result = await this.TrackRep.createQueryBuilder()
      .update({ ...trackB })
      .where({ id })
      .returning('*')
      .execute();

    if (result.affected) return result.raw[0];

    throw new NotFoundException();
  }

  // async removeCascadeAlb(id: string) {
  //   console.log("dd");

  //   await this.TrackRep.createQueryBuilder()
  //     .update({ artistId: null })
  //     .where({ artistId: id })
  //     .returning('*')
  //     .execute();
  // }
  // removeCascadeArt(id: string) {
  //   for (let i = 0; i < track.length; i++)
  //     if (track[i].artistId === id) track[i].artistId = null;
  // }
}
