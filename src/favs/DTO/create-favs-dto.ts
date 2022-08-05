import { AlbumSchema } from 'src/entities/album-entity';
import { ArtistSchema } from 'src/entities/artist-entity';
import { TrackSchema } from 'src/entities/track-entity';

export class Fav {
  artists: ArtistSchema[];
  albums: AlbumSchema[];
  tracks: TrackSchema[];
}
