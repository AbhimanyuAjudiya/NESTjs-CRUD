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
import { Logger } from '../logger.service';

@Injectable()
export class WalletAddressService {
  constructor(
    @InjectRepository(WalletAddress)
    private walletAddressRepository: Repository<WalletAddress>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly logger: Logger,
  ) {}

  async create(
    createWalletAddressDto: CreateWalletAddressDto,
  ): Promise<WalletAddress> {
    const user = await this.userRepository.findOneBy({
      id: createWalletAddressDto.userId,
    });
    if (!user) {
      this.logger.error(
        `User with ID ${createWalletAddressDto.userId} not found`,
      );
      throw new BadRequestException('User does not exist');
    }

    const walletAddress = this.walletAddressRepository.create(
      createWalletAddressDto,
    );
    walletAddress.user = user;
    const savedWalletAddress =
      await this.walletAddressRepository.save(walletAddress);
    this.logger.log(`Wallet address created: ${savedWalletAddress.id}`);
    return savedWalletAddress;
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
      this.logger.error(`Wallet address with ID ${id} not found`);
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
        this.logger.error(
          `User with ID ${updateWalletAddressDto.userId} not found`,
        );
        throw new BadRequestException('User does not exist');
      }
      walletAddress.user = user;
    }

    Object.assign(walletAddress, updateWalletAddressDto);
    const updatedWalletAddress =
      await this.walletAddressRepository.save(walletAddress);
    this.logger.log(`Wallet address updated: ${updatedWalletAddress.id}`);
    return updatedWalletAddress;
  }

  async remove(id: number): Promise<void> {
    const walletAddress = await this.findOne(id);
    await this.walletAddressRepository.remove(walletAddress);
    this.logger.log(`Wallet address deleted: ${id}`);
  }
}
