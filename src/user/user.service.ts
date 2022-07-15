import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { users } from 'src/memoryBd/bd';
import { CreateUserDTO } from './DTO/create-user-dto';
import { UpdatePasswordDto } from './DTO/update-user-dto';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { FullUserDto } from './DTO/full-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>,
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
    const newUser = await this.usersRepository.insert(user);

    return this.findbyId(newUser.identifiers[0].id);
  }
  async remove(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const index = await this.usersRepository.delete({ id });
    if (!index.affected) throw new NotFoundException('User not found');
  }
  async update(id: string, user: UpdatePasswordDto) {
    const updUser = await this.findbyId(id);
    if (updUser.password === user.oldPassword) {
      updUser.password = user.newPassword;
      return await this.usersRepository.save({ id: id, ...updUser });
    }
    throw new ForbiddenException('old password is wrong');
  }
}
