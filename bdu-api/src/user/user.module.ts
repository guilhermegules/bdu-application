import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { BankAccountModule } from '../bank-account/bank-account.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BankAccountModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
