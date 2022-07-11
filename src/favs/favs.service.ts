import { BadRequestException, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { favs } from 'src/memoryBd/bd';
import { TrackService } from 'src/track/track.service';
import { CreatefavsDTO } from './DTO/create-favs-dto';

const albSer = new AlbumService();
const trackSer = new TrackService();
const artSer = new ArtistService();

@Injectable()
export class FavsService {
  getAll(): CreatefavsDTO {
    return favs;
  }
  addfavTrack(id: string) {
    if (!trackSer.getById(id)) throw new BadRequestException();
    favs.tracks.push(id);
    return `Add new favorite track`;
  }
  removeFavTrack(id: string) {
    const indx = favs.tracks.findIndex((i) => i == id);
    favs.tracks.splice(indx, 1);
  }

  addfavAlbum(id: string) {
    if (!albSer.getById(id)) throw new BadRequestException();
    favs.albums.push(id);
    return `Add new favorite track`;
  }
  removeFavAlbum(id: string) {
    const indx = favs.albums.findIndex((i) => i == id);
    favs.albums.splice(indx, 1);
  }

  addfavArtist(id: string) {
    if (!artSer.getById(id)) throw new BadRequestException();
    favs.artists.push(id);
    return `Add new favorite track`;
  }
  removeFavArtist(id: string) {
    const indx = favs.artists.findIndex((i) => i == id);
    favs.artists.splice(indx, 1);
  }
}
