import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json';
import { sign } from 'crypto';

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
      tokenJson.abi,
      this.wallet,
    );
  }

  getTokenContractAddress() {
    return this.configService.get<string>('TOKEN_ADDRESS');
  }

  getBallotContractAddress() {
    return this.configService.get<string>('BALLOT_ADDRESS');
  }

  async getBalanceOf(address: string) {
    return ethers.formatUnits(await this.contract.balanceOf(address));
  }

  async checkMinterRole(address: string) {
    const MINTER_ROLE = await this.contract.MINTER_ROLE();
    return await this.contract.hasRole(MINTER_ROLE, address);
  }

  async mintTokens(address: string, signature: string) {
    return signature !== ''
      ? await this.contract.mint(address, ethers.parseUnits('100'))
      : false;
  }
}
