import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Artist } from 'src/artist/DTO/full-arist-dto';
import { Album } from 'src/album/DTO/album';
import { Fav } from './DTO/create-favs-dto';
import { validate as uuidValidate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { FavSchema } from 'src/entities/fav.entity';
import { DataSource, Repository } from 'typeorm';
import { TrackSchema } from 'src/entities/track-entity';
import { AlbumSchema } from 'src/entities/album-entity';
import { ArtistSchema } from 'src/entities/artist-entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavSchema)
    private favRep: Repository<FavSchema>,
    @InjectRepository(TrackSchema)
    private trackR: Repository<TrackSchema>,
    @InjectRepository(AlbumSchema)
    private albR: Repository<AlbumSchema>,
    @InjectRepository(ArtistSchema)
    private artR: Repository<ArtistSchema>,

    private dataSource: DataSource,
  ) {
    // favRep
    //   .delete({ idUser: '05261413-9309-45ec-9ce1-9a2e811f3083' })
    //   .then((res) =>
    //     favRep.insert({
    //       idUser: '05261413-9309-45ec-9ce1-9a2e811f3083',
    //     }),
    //   );
  }

  async getAll(): Promise<Fav> {
    const [fav] = await this.favRep.find({
      relations: ['artists', 'tracks', 'albums'],
    });
    return { albums: fav.albums, artists: fav.artists, tracks: fav.tracks };
  }
  async addfavTrack(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const track = await this.trackR.findOneBy({ id });
    if (!track) throw new UnprocessableEntityException();
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('fav_use_track')
      .values([
        { track_id: id, fav_id: '05261413-9309-45ec-9ce1-9a2e811f3083' },
      ])
      .execute();

    return track;
  }
  async removeFavTrack(id: string) {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from('fav_use_track')
      .where('track_id = :id', { id })
      .execute();
  }

  async addfavAlbum(id: string): Promise<Album> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const album = await this.albR.findOneBy({ id });
    if (!album) throw new UnprocessableEntityException();
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('fav_use_alb')
      .values([{ alb_id: id, fav_id: '05261413-9309-45ec-9ce1-9a2e811f3083' }])
      .execute();
    return album;
  }
  async removeFavAlbum(id: string) {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from('fav_use_alb')
      .where('alb_id = :id', { id })
      .execute();
  }

  async addfavArtist(id: string): Promise<Artist> {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const artist = await this.artR.findOneBy({ id });
    if (!artist) throw new UnprocessableEntityException();
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('fav_use_art')
      .values([{ art_id: id, fav_id: '05261413-9309-45ec-9ce1-9a2e811f3083' }])
      .execute();
    return artist;
  }
  async removeFavArtist(id: string) {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from('fav_use_art')
      .where(' art_id = :id', { id })
      .execute();
  }
}
