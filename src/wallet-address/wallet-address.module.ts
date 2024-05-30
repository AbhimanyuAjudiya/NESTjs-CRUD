import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletAddressController } from './wallet-address.controller';
import { WalletAddressService } from './wallet-address.service';
import { WalletAddress } from './wallet-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletAddress])],
  controllers: [WalletAddressController],
  providers: [WalletAddressService],
})
export class WalletAddressModule {}
