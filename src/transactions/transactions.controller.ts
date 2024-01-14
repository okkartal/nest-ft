import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TransactionDto } from './dtos/transactionDto';
import { Transaction } from './schemas/transaction.schema';
import { TransactionsService } from './transactions.service';
import { Response } from 'express';

@Controller('/api/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':accountId')
  async accountBalance(
    @Param('accountId') accountId: string,
  ): Promise<Transaction[]> {
    return this.transactionsService.findByAccountId(accountId);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Post('/withdrawFunds')
  withdrawFunds(@Body() transaction: TransactionDto, @Res() res: Response) {
    return this.transactionsService
      .withDrawFunds(transaction.accountId, transaction.amount)
      .then(() =>
        res.status(HttpStatus.OK).json({ message: 'withdraw is completed' }),
      )
      .catch((err) => res.status(400).json({ message: err }));
  }

  @Post('/depositFunds')
  depositFunds(@Body() transaction: TransactionDto, @Res() res: Response) {
    return this.transactionsService
      .depositFunds(transaction.accountId, transaction.amount)
      .then(() =>
        res.status(HttpStatus.OK).json({ message: 'deposit is completed' }),
      )
      .catch((err) => res.status(400).json({ message: err }));
  }
}
