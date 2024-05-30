import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAddress } from './wallet-address.entity';
import {
  CreateWalletAddressDto,
  UpdateWalletAddressDto,
} from './dto/wallet-address.dto';

@Injectable()
export class WalletAddressService {
  constructor(
    @InjectRepository(WalletAddress)
    private walletAddressRepository: Repository<WalletAddress>,
  ) {}

  async create(
    createWalletAddressDto: CreateWalletAddressDto,
  ): Promise<WalletAddress> {
    const walletAddress = this.walletAddressRepository.create(
      createWalletAddressDto,
    );
    return this.walletAddressRepository.save(walletAddress);
  }

  async findAll(): Promise<WalletAddress[]> {
    return this.walletAddressRepository.find();
  }

  async findOne(id: number): Promise<WalletAddress> {
    const walletAddress = await this.walletAddressRepository.findOneBy({ id });
    if (!walletAddress)
      throw new NotFoundException(`Wallet Address with ID ${id} not found`);
    return walletAddress;
  }

  async update(
    id: number,
    updateWalletAddressDto: UpdateWalletAddressDto,
  ): Promise<WalletAddress> {
    await this.walletAddressRepository.update(id, updateWalletAddressDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.walletAddressRepository.delete(id);
  }
}
