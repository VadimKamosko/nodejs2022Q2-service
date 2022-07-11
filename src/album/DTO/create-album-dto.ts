import { IsNotEmpty } from 'class-validator';

export class CreateAlbumDTO {
  id: string;
  @IsNotEmpty({ message: 'The required oldPassword name is missing' })
  name: string;
  @IsNotEmpty({ message: 'The required oldPassword year is missing' })
  year: number;
  @IsNotEmpty({ message: 'The required artistId year is missing' })
  artistId: string;
}
