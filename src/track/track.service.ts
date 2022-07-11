import { BadRequestException, Injectable } from '@nestjs/common';
import { TrackcCreateDTO } from './DTO/create-track-dto';
import { track } from 'src/memoryBd/bd';
import { UpdateTrackDTO } from './DTO/update-track-dto';
import { v4 as uuidv4 } from 'uuid';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

const artSer = new ArtistService();
const albSer = new AlbumService();

@Injectable()
export class TrackService {
  getAll(): TrackcCreateDTO[] {
    return track;
  }
  getById(id: string): TrackcCreateDTO {
    return track.find((item) => item.id === id);
  }
  create(trackB: UpdateTrackDTO): TrackcCreateDTO {
    if (!trackB.albumId) trackB.albumId = null;
    else if (!albSer.getById(trackB.albumId)) throw new BadRequestException();
    if (!artSer.getById(trackB.artistId)) throw new BadRequestException();
    track.push({
      id: uuidv4(),
      ...trackB,
    });
    return track[track.length - 1];
  }
  remove(id: string): string {
    const index = track.findIndex((item) => item.id == id);
    track.splice(index, 1);
    return `Deleted ${id}`;
  }
  update(id: string, trackB: UpdateTrackDTO) {
    track.map((item: TrackcCreateDTO) => {
      if (item.id == id) {
        if (trackB.name) item.name = trackB.name;
        if (trackB.artistId) item.artistId = trackB.artistId;
        if (trackB.albumId) item.albumId = trackB.albumId;
        if (trackB.duration) item.duration = trackB.duration;
      }
      return item;
    });
    return `Update ${id}`;
  }
}
