import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDTO {
  id: string;
  @IsNotEmpty({ message: 'The required oldPassword name is missing' })
  @IsString()
  name: string;
  @IsNotEmpty({ message: 'The required oldPassword year is missing' })
  @IsNumber()
  year: number;
  artistId: string | null;
}
