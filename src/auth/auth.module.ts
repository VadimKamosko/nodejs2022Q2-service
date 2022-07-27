import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/entities/user.entity';
import { AtStrategies } from 'src/strategies/at.strat';
import { RtStrategies } from 'src/strategies/rt.strat';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema]), JwtModule.register({})],
  providers: [AuthService, AtStrategies, RtStrategies],
  controllers: [AuthController],
})
export class AuthModule {}
