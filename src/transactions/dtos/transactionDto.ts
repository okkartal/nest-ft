import { IsMongoId, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class TransactionDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  accountId: string;

  @IsPositive()
  @IsNotEmpty()
  amount: number;
}
