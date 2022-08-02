import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user-dto';
import { UpdateUserDto } from './DTO/update-user-dto';
import { validate as uuidValidate } from 'uuid';
import { FullUserDto } from './DTO/full-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { FavSchema } from 'src/entities/fav.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>,

    @InjectRepository(FavSchema)
    private favRep: Repository<FavSchema>,
  ) {}
  async getAll(): Promise<FullUserDto[]> {
    return await this.usersRepository.find();
  }
  async findbyId(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async create(user: CreateUserDTO): Promise<FullUserDto> {
    user.password = await this.hashPass(user.password);

    const newUser = await this.usersRepository.insert(user);

    await this.favRep.insert({
      idUser: newUser.identifiers[0].id,
    });

    return this.findbyId(newUser.identifiers[0].id);
  }
  async remove(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const index = await this.usersRepository.delete({ id });
    // await this.favRep.delete({ idUser: id });
    if (!index.affected) throw new NotFoundException('User not found');
  }
  async update(id: string, user: UpdateUserDto) {
    const updUser = await this.findbyId(id);
    const isEq = await bcrypt.compare(user.oldPassword, updUser.password);
    if (isEq) {
      updUser.password = await this.hashPass(user.newPassword);
      return await this.usersRepository.save({ id: id, ...updUser });
    }
    throw new ForbiddenException('old password is wrong');
  }

  hashPass(password: string) {
    return bcrypt.hash(password, 10);
  }
}
