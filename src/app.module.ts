import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WalletAddressModule } from './wallet-address/wallet-address.module';
import { User } from './users/user.entity';
import { WalletAddress } from './wallet-address/wallet-address.entity';
import { ConfigModule } from '@nestjs/config';
import { Logger } from './logger.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_USER_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, WalletAddress],
      synchronize: true,
    }),
    UsersModule,
    WalletAddressModule,
  ],
  providers: [Logger],
})
export class AppModule {}
