import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavSchema } from 'src/entities/fav.entity';
import { UserSchema } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema, FavSchema])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
