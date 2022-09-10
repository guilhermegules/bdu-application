import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DATABASE_HOST || 'localhost',
      port: Number(process.env.MYSQL_DATABASE_PORT) || 3306,
      username: process.env.MYSQL_DATABASE_USER || 'root',
      password: process.env.MYSQL_DATABASE_PASSWORD || 'root',
      database: process.env.MYSQL_DATABASE_NAME,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
