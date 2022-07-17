import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { favs } from 'src/memoryBd/bd';
import { TrackService } from 'src/track/track.service';
import { Artist } from 'src/artist/DTO/full-arist-dto';
import { Album } from 'src/album/DTO/album';
import { Fav } from './DTO/create-favs-dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { albums, track, artists } from 'src/memoryBd/bd';
import { InjectRepository } from '@nestjs/typeorm';
import { FavSchema } from 'src/entities/fav.entity';
import { Repository } from 'typeorm';
import { TrackSchema } from 'src/entities/track-entity';
import { AlbumSchema } from 'src/entities/album-entity';
import { ArtistSchema } from 'src/entities/artist-entity';

@Injectable()
export class FavsService {
  private readonly albSer: AlbumService;
  private readonly trackSer: TrackService;
  private readonly artSer: ArtistService;
  constructor(
    @InjectRepository(FavSchema)
    private favRep: Repository<FavSchema>,
    @InjectRepository(TrackSchema)
    private trackR: Repository<TrackSchema>,
    @InjectRepository(AlbumSchema)
    private albR: Repository<AlbumSchema>,
    @InjectRepository(ArtistSchema)
    private artR: Repository<ArtistSchema>,
  ) {
    favRep.delete({ id: '05261413-9309-45ec-9ce1-9a2e811f3083' }).then((res) =>
      favRep.insert({
        id: '05261413-9309-45ec-9ce1-9a2e811f3083',
        artists: [],
        albums: [],
        tracks: [],
      }),
    );
  }

  async getAll(): Promise<Fav> {
    const fav = await this.favRep.find();
    let allFavArt: ArtistSchema[] = [],
      allfavAlb: AlbumSchema[] = [],
      allfavTrack: TrackSchema[] = [];
    if (fav[0] && fav[0].artists.length !== 0) {
      allFavArt = await this.artR
        .createQueryBuilder()
        .where('id IN (:...ids)', { ids: fav[0].artists })
        .getMany();
    }
    if (fav[0] && fav[0].albums.length !== 0) {
      allfavAlb = await this.albR
        .createQueryBuilder()
        .where('id IN (:...ids)', { ids: fav[0].albums })
        .getMany();
    }
    if (fav[0] && fav[0].tracks.length !== 0) {
      allfavTrack = await this.trackR
        .createQueryBuilder()
        .where('id IN (:...ids)', { ids: fav[0].tracks })
        .getMany();
    }
    return { albums: allfavAlb, artists: allFavArt, tracks: allfavTrack };
  }
  async addfavTrack(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const track = await this.trackR.findOneBy({ id });
    if (!track) throw new UnprocessableEntityException();
    await this.favRep
      .createQueryBuilder()
      .update()
      .set({
        tracks: () => `array_append("tracks", '${id}')`,
      })
      .where('id = :id', { id: '05261413-9309-45ec-9ce1-9a2e811f3083' })
      .execute();
    return track;
  }
  async removeFavTrack(id: string) {
    await this.favRep
      .createQueryBuilder()
      .update()
      .set({
        tracks: () => `array_remove("tracks", '${id}')`,
      })
      .where('id = :id', { id: '05261413-9309-45ec-9ce1-9a2e811f3083' })
      .execute();
  }

  async addfavAlbum(id: string): Promise<Album> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const album = await this.albR.findOneBy({ id });
    if (!album) throw new UnprocessableEntityException();
    await this.favRep
      .createQueryBuilder()
      .update()
      .set({
        albums: () => `array_append("albums", '${id}')`,
      })
      .where('id = :id', { id: '05261413-9309-45ec-9ce1-9a2e811f3083' })
      .execute();
    return album;
  }
  async removeFavAlbum(id: string) {
    await this.favRep
      .createQueryBuilder()
      .update()
      .set({
        albums: () => `array_remove("albums", '${id}')`,
      })
      .where('id = :id', { id: '05261413-9309-45ec-9ce1-9a2e811f3083' })
      .execute();
  }

  async addfavArtist(id: string): Promise<Artist> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const artist = await this.artR.findOneBy({ id });
    if (!artist) throw new UnprocessableEntityException();
    await this.favRep
      .createQueryBuilder()
      .update()
      .set({
        artists: () => `array_append("artists", '${id}')`,
      })
      .where('id = :id', { id: '05261413-9309-45ec-9ce1-9a2e811f3083' })
      .execute();
    return artist;
  }
  async removeFavArtist(id: string) {
    await this.favRep
      .createQueryBuilder()
      .update()
      .set({
        artists: () => `array_remove("artists", '${id}')`,
      })
      .where('id = :id', { id: '05261413-9309-45ec-9ce1-9a2e811f3083' })
      .execute();
  }
}
