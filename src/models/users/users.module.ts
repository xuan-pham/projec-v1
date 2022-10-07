import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UserReponsitory } from './users.reponsitory';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),],
  controllers: [UsersController],
  providers: [UsersService, JwtService, UserReponsitory],
  exports: [UsersService]
})
export class UsersModule { }
