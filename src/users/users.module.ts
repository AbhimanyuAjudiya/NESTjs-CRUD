import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { WalletAddress } from '../wallet-address/wallet-address.entity';
import { Logger } from '../logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, WalletAddress])],
  providers: [UsersService, Logger],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
