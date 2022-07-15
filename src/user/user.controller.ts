import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserSchema } from 'src/entities/user.entity';
import { CreateUserDTO } from './DTO/create-user-dto';
import { FullUserDto } from './DTO/full-user.dto';
import { UpdatePasswordDto } from './DTO/update-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(): Promise<FullUserDto[]> {
    return this.userService.getAll();
  }
  @Get(':id')
  findByid(@Param('id') id): Promise<FullUserDto> {
    return this.userService.findbyId(id);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async addNewUser(@Body() CreateUserDto: CreateUserDTO): Promise<FullUserDto> {
    return new FullUserDto(await this.userService.create(CreateUserDto));
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id) {
    await this.userService.remove(id);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateUser(
    @Body() body: UpdatePasswordDto,
    @Param('id') id,
  ): Promise<FullUserDto> {
    return new FullUserDto(await this.userService.update(id, body));
  }
}
