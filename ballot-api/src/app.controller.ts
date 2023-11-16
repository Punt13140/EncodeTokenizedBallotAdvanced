import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestTokensDto } from './dtos/requestTokensDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('token-contract-address')
  getTokenContractAddress() {
    return { result: this.appService.getTokenContractAddress() };
  }

  @Get('ballot-contract-address')
  getBallotContractAddress() {
    return { result: this.appService.getBallotContractAddress() };
  }

  @Get('balance-of/:address')
  async getBalanceOf(@Param('address') address: string) {
    return { result: await this.appService.getBalanceOf(address) };
  }

  @Get('check-minter-role')
  async checkMinterRole(@Query('address') address: string) {
    return { result: await this.appService.checkMinterRole(address) };
  }

  @Post('request-tokens')
  async requestTokens(@Body() body: RequestTokensDto) {
    return {
      result: await this.appService.mintTokens(body.address, body.signature),
    };
  }
}
