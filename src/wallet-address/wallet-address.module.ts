import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletAddressController } from './wallet-address.controller';
import { WalletAddressService } from './wallet-address.service';
import { WalletAddress } from './wallet-address.entity';
import { User } from 'src/users/user.entity';
import { Logger } from '../logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([WalletAddress, User])],
  controllers: [WalletAddressController],
  providers: [WalletAddressService, Logger],
  exports: [WalletAddressService],
})
export class WalletAddressModule {}
