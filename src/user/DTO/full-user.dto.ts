import { Exclude } from 'class-transformer';

export class FullUserDto {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  createdAt: Date | number;

  updatedAt: Date | number;

  constructor(partial: Partial<FullUserDto>) {
    partial.createdAt = partial.createdAt.valueOf();
    partial.updatedAt = partial.updatedAt.valueOf();
    Object.assign(this, partial);
  }
}
