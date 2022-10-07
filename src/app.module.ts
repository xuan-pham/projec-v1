import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './models/users/users.module';
import { VideosModule } from './models/videos/videos.module';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants/constants';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      secret,
      signOptions: {
        expiresIn: '2h'
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    })
    ,
    DatabaseModule,
    UsersModule,
    VideosModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
