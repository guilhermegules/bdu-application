import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { HistoricController } from './controllers/historic.controller';
import { HistoricService } from './services/historic.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, HistoricController],
  providers: [UserService, HistoricService],
  exports: [UserService],
})
export class UserModule {}
