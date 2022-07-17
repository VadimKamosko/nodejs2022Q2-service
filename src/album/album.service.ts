import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDTO } from './DTO/create-album-dto';
import { albums } from 'src/memoryBd/bd';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { Album } from './DTO/album';
import { FavsService } from 'src/favs/favs.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favService: FavsService,

    private readonly trackSer: TrackService,
  ) {}
  getAll(): Album[] {
    return albums;
  }
  async getById(id: string): Promise<Album> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const album = await albums.find((item) => item.id === id);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }
  create(albumsB: CreateAlbumDTO): Album {
    // if (!artSer.getById(albumsB.artistId)) throw new BadRequestException();
    const alb = {
      id: uuidv4(),
      ...albumsB,
    };
    albums.push(alb);

    return alb;
  }
  async remove(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const index = await albums.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('Album not found');
    albums.splice(index, 1);
    await this.favService.removeFavAlbum(id, false);
    await this.trackSer.removeCascadeAlb(id);
  }
  async update(id: string, albumsB: CreateAlbumDTO) {
    const albUpdate = await this.getById(id);

    if (albumsB.name) albUpdate.name = albumsB.name;
    if (albumsB.artistId) albUpdate.artistId = albumsB.artistId;
    if (albumsB.year) albUpdate.year = albumsB.year;

    return albUpdate;
  }

  removeArtCascade(id: string) {
    for (let i = 0; i < albums.length; i++)
      if (albums[i].artistId === id) albums[i].artistId = null;
  }
}
