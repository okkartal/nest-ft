import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AccountsService } from 'src/accounts/accounts.service';
import { transactionTypes } from 'src/config/transaction-types';
import { Transaction } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(AccountsService) private readonly accountService: AccountsService,
    @InjectModel('Transaction')
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return await this.transactionModel.find({}, { __v: 0}).exec();
  }

  async findByAccountId(accountId: string): Promise<Transaction[]> {
    return await this.transactionModel
      .find({ accountId: new Types.ObjectId(accountId) }, { __v: 0})
      .exec();
  }

  async accountIsUpdated(accountId: string, type: string, amount: number) {
    return await this.accountService.updateBalance(accountId, type, amount);
  }

  async makeTransaction(accountId: string, type: string, amount: number) {
    if (await this.accountIsUpdated(accountId, type, amount)) {
      const newTransaction = new Transaction(accountId, type, amount);
      this.create(newTransaction);
      return true;
    }
    return false;
  }

  async withDrawFunds(accountId: string, amount: number): Promise<boolean> {
    return await this.makeTransaction(accountId, transactionTypes.WITHDRAW, amount);
  }

  async depositFunds(accountId: string, amount: number): Promise<boolean> {
    return await this.makeTransaction(accountId, transactionTypes.DEPOSIT, amount);
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const newTransaction = new this.transactionModel(transaction);
    return await newTransaction.save();
  }
}
