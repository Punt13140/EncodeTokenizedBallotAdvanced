import { ApiProperty } from '@nestjs/swagger';

export class RequestTokensDto {
  @ApiProperty({ type: String, required: true, default: 'My Address' })
  address: string;

  @ApiProperty({ type: String, required: true, default: 'My Signature' })
  signature: string;
}
