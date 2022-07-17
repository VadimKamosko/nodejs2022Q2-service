import { Album } from 'src/album/DTO/album';
import { Artist } from 'src/artist/DTO/full-arist-dto';
import { AlbumSchema } from 'src/entities/album-entity';
import { ArtistSchema } from 'src/entities/artist-entity';
import { TrackSchema } from 'src/entities/track-entity';
import { Track } from 'src/track/DTO/Track';

export class Fav {
  artists: ArtistSchema[];
  albums: AlbumSchema[];
  tracks: TrackSchema[];
}
