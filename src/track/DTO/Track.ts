import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Track {
  id: string;
  @IsNotEmpty({ message: 'The required name field is missing' })
  @IsString()
  name: string;
  artistId: string;
  albumId: string;
  @IsNotEmpty({ message: 'The required duration field is missing' })
  @IsNumber()
  duration: number;
}
