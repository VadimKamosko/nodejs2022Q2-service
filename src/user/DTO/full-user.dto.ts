import { Exclude } from 'class-transformer';

export class FullUserDto {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<FullUserDto>) {
    Object.assign(this, partial);
  }
}
