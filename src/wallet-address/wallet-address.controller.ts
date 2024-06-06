import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import {
  CreateWalletAddressDto,
  UpdateWalletAddressDto,
} from './dto/wallet-address.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WalletAddress } from './wallet-address.entity';

@ApiTags('wallet-addresses')
@Controller('wallet-addresses')
export class WalletAddressController {
  constructor(private readonly walletAddressService: WalletAddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wallet address' })
  @ApiResponse({
    status: 201,
    description: 'The wallet address has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(
    @Body() createWalletAddressDto: CreateWalletAddressDto,
  ): Promise<WalletAddress> {
    return this.walletAddressService.create(createWalletAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wallet addresses' })
  @ApiResponse({ status: 200, description: 'Return all wallet addresses.' })
  findAll(): Promise<WalletAddress[]> {
    return this.walletAddressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a wallet address by ID' })
  @ApiResponse({ status: 200, description: 'Return the wallet address.' })
  @ApiResponse({ status: 404, description: 'Wallet address not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<WalletAddress> {
    return this.walletAddressService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a wallet address by ID' })
  @ApiResponse({
    status: 200,
    description: 'The wallet address has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Wallet address not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWalletAddressDto: UpdateWalletAddressDto,
  ): Promise<WalletAddress> {
    return this.walletAddressService.update(id, updateWalletAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wallet address by ID' })
  @ApiResponse({
    status: 200,
    description: 'The wallet address has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Wallet address not found.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.walletAddressService.remove(id);
  }
}
