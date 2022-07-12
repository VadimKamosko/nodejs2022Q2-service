import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Track } from './DTO/Track';
import { track } from 'src/memoryBd/bd';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackcCreateDTO } from './DTO/create-track-dto';

const artSer = new ArtistService();
const albSer = new AlbumService();

@Injectable()
export class TrackService {
  getAll(): Track[] {
    return track;
  }
  async getById(id: string): Promise<Track> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const trackFind = await track.find((i) => i.id === id);
    if (!trackFind) throw new NotFoundException('User not found');
    return trackFind;
  }
  create(trackB: TrackcCreateDTO): Track {
    // if (!trackB.albumId) trackB.albumId = null;
    // else if (!albSer.getById(trackB.albumId)) throw new BadRequestException();
    // if (!artSer.getById(trackB.artistId)) throw new BadRequestException();
    track.push({
      id: uuidv4(),
      ...trackB,
    });
    return track[track.length - 1];
  }
  async remove(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const index = await track.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('Track not found');
    track.splice(index, 1);
  }
  async update(id: string, trackB: TrackcCreateDTO): Promise<Track> {
    const UpdTrack = await this.getById(id);

    if (trackB.name) UpdTrack.name = trackB.name;
    if (trackB.artistId) UpdTrack.artistId = trackB.artistId;
    if (trackB.albumId) UpdTrack.albumId = trackB.albumId;
    if (trackB.duration) UpdTrack.duration = trackB.duration;

    return UpdTrack;
  }
}
