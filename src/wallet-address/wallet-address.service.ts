import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAddress } from './wallet-address.entity';
import {
  CreateWalletAddressDto,
  UpdateWalletAddressDto,
} from './dto/wallet-address.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class WalletAddressService {
  constructor(
    @InjectRepository(WalletAddress)
    private walletAddressRepository: Repository<WalletAddress>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createWalletAddressDto: CreateWalletAddressDto,
  ): Promise<WalletAddress> {
    const user = await this.userRepository.findOneBy({
      id: createWalletAddressDto.userId,
    });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const walletAddress = this.walletAddressRepository.create(
      createWalletAddressDto,
    );
    walletAddress.user = user;
    return this.walletAddressRepository.save(walletAddress);
  }

  findAll(): Promise<WalletAddress[]> {
    return this.walletAddressRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<WalletAddress> {
    const walletAddress = await this.walletAddressRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!walletAddress) {
      throw new NotFoundException(`Wallet address #${id} not found`);
    }
    return walletAddress;
  }

  async update(
    id: number,
    updateWalletAddressDto: UpdateWalletAddressDto,
  ): Promise<WalletAddress> {
    const walletAddress = await this.findOne(id);
    if (updateWalletAddressDto.userId) {
      const user = await this.userRepository.findOneBy({
        id: updateWalletAddressDto.userId,
      });
      if (!user) {
        throw new BadRequestException('User does not exist');
      }
      walletAddress.user = user;
    }

    Object.assign(walletAddress, updateWalletAddressDto);
    return this.walletAddressRepository.save(walletAddress);
  }

  async remove(id: number): Promise<void> {
    const walletAddress = await this.findOne(id);
    await this.walletAddressRepository.remove(walletAddress);
  }
}
