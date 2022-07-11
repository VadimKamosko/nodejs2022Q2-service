import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './DTO/create-user-dto';
import { FullUserDto } from './DTO/full-user.dto';
import { UpdatePasswordDto } from './DTO/update-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
   findAll(): Promise<FullUserDto[]> {
    return  this.userService.getAll();
  }
  @Get(':id')
   findByid(@Param('id') id): Promise<FullUserDto> {
    return  this.userService.findbyId(id);
  }
  @Post()
   addNewUser(@Body() CreateUserDto: CreateUserDTO): Promise<FullUserDto> {
    return  this.userService.create(CreateUserDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id) {
    await this.userService.remove(id);
  }

  @Put(':id')
   updateUser(
    @Body() body: UpdatePasswordDto,
    @Param('id') id,
  ): Promise<FullUserDto> {
    return  this.userService.update(id, body);
  }
}
