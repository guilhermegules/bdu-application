import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BankAccount } from './bank-account/entities/bank-account.entity';
import { User } from './user/entities/user.entity';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { BankAccountModule } from './bank-account/bank-account.module';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionAggregation } from './transaction/entities/transaction-aggregation.entity';
import { Transaction } from './transaction/entities/transaction.entity';

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
      entities: [User, BankAccount, Transaction, TransactionAggregation],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    BankAccountModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
