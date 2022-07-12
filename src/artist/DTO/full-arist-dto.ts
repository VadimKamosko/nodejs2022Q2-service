import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class Artist {
  @IsString()
  id: string;
  @IsNotEmpty({ message: 'The required name field is missing' })
  @IsString()
  name: string;
  @IsNotEmpty({ message: 'The required grammy name is missing' })
  @IsBoolean()
  grammy: boolean;
}
