import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class AppService {
  contract: ethers.Contract;
  provider: ethers.Provider;
  wallet: ethers.Wallet;

  constructor(private configService: ConfigService) {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('RPC_ENDPOINT_URL'),
    );
    this.wallet = new ethers.Wallet(
      this.configService.get<string>('PRIVATE_KEY'),
      this.provider,
    );
    this.contract = new ethers.Contract(
      this.configService.get<string>('TOKEN_ADDRESS'),
      '@TODO tokenJson.abi',
      this.wallet,
    );
  }

  getHello(): string {
    return 'Hello World!';
  }
}
