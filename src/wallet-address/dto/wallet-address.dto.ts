import { IsNotEmpty } from 'class-validator';

export class CreateWalletAddressDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  address: string;
}

export class UpdateWalletAddressDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  address: string;
}
