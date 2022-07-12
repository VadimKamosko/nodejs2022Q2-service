import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { favs } from 'src/memoryBd/bd';
import { TrackService } from 'src/track/track.service';
import { validate as uuidValidate } from 'uuid';
import { Artist } from 'src/artist/DTO/full-arist-dto';
import { Album } from 'src/album/DTO/album';
import { Fav } from './DTO/create-favs-dto';

@Injectable()
export class FavsService {
  constructor(
    private readonly albSer: AlbumService,
    private readonly trackSer: TrackService,
    private readonly artSer: ArtistService,
  ) {}

  async getAll(): Promise<Fav> {
    const allfavTrack = await Promise.all(
      favs.tracks.map(async (i) => await this.trackSer.getById(i)),
    );
    const allfavAlb = await Promise.all(
      favs.albums.map(async (i) => await this.albSer.getById(i)),
    );
    const allFavArt = await Promise.all(
      favs.artists.map(async (i) => await this.artSer.getById(i)),
    );
    return { albums: allfavAlb, artists: allFavArt, tracks: allfavTrack };
  }
  async addfavTrack(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const track = await this.trackSer.getById(id);
    favs.tracks.push(id);
    return track;
  }
  removeFavTrack(id: string) {
    const indx = favs.tracks.findIndex((i) => i == id);
    favs.tracks.splice(indx, 1);
  }

  async addfavAlbum(id: string): Promise<Album> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const alb = await this.albSer.getById(id);
    favs.albums.push(id);
    return alb;
  }
  removeFavAlbum(id: string) {
    const indx = favs.albums.findIndex((i) => i == id);
    favs.albums.splice(indx, 1);
  }

  async addfavArtist(id: string): Promise<Artist> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const art = await this.artSer.getById(id);
    favs.artists.push(id);
    return art;
  }
  removeFavArtist(id: string) {
    const indx = favs.artists.findIndex((i) => i == id);
    favs.artists.splice(indx, 1);
  }
}
