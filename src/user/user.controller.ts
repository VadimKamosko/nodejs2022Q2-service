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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from './DTO/create-user-dto';
import { FullUserDto } from './DTO/full-user.dto';
import { UpdateUserDto } from './DTO/update-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard('JWT'))
  @Get()
  findAll(): Promise<FullUserDto[]> {
    return this.userService.getAll();
  }
  @UseGuards(AuthGuard('JWT'))
  @Get(':id')
  findByid(@Param('id') id): Promise<FullUserDto> {
    return this.userService.findbyId(id);
  }
  @UseGuards(AuthGuard('JWT'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async addNewUser(@Body() CreateUserDto: CreateUserDTO): Promise<FullUserDto> {
    return new FullUserDto(await this.userService.create(CreateUserDto));
  }
  @UseGuards(AuthGuard('JWT'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id) {
    await this.userService.remove(id);
  }
  @UseGuards(AuthGuard('JWT'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateUser(
    @Body() body: UpdateUserDto,
    @Param('id') id,
  ): Promise<FullUserDto> {
    return new FullUserDto(await this.userService.update(id, body));
  }
}
