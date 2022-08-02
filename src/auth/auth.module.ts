import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { FavSchema } from 'src/entities/fav.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema, FavSchema]),
    JwtModule.register({}),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
