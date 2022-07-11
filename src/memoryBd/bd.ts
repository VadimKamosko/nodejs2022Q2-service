import { CreateAlbumDTO } from 'src/album/DTO/create-album-dto';
import { FullArtistDto } from 'src/artist/DTO/full-arist-dto';
import { CreatefavsDTO } from 'src/favs/DTO/create-favs-dto';
import { TrackcCreateDTO } from 'src/track/DTO/create-track-dto';
import { FullUserDto } from 'src/user/DTO/full-user.dto';

export const users: FullUserDto[] = [];
export const artists: FullArtistDto[] = [];
export const track: TrackcCreateDTO[] = [];
export const albums: CreateAlbumDTO[] = [];
export const favs: CreatefavsDTO = {
  artists: [],
  albums: [],
  tracks: [],
};
