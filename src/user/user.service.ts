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

@Injectable()
export class UserService {
  async getAll() {
    return users;
  }
  async findbyId(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const user = await users.find((i) => i.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async create(user: CreateUserDTO) {
    users.push({
      id: uuidv4(),
      ...user,
      version: 1,
      createdAt: new Date().valueOf(),
      updatedAt: new Date().valueOf(),
    });
    return users[users.length - 1];
  }
  async remove(id: string) {
    if (!uuidValidate(id)) throw new BadRequestException('Invalid UUID');
    const index = await users.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    users.splice(index, 1);
  }
  async update(id: string, user: UpdatePasswordDto) {
    const userUpd = await this.findbyId(id);

    if (user.oldPassowrd !== userUpd.password)
      throw new ForbiddenException('old password is wrong');

    userUpd.password = user.newPassword;
    userUpd.updatedAt = new Date().valueOf();
    userUpd.version = userUpd.version + 1;

    return userUpd;
  }
}
