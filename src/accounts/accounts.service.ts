import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { transactionTypes } from '../config/transaction-types';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { Account } from '../accounts/schemas/account.schema';

@Injectable()
export class AccountsService implements OnModuleInit {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
    @InjectModel('Account') private readonly accountModel: Model<Account>,
  ) {}

  async onModuleInit() {
    try {
      await this.initializeData();
    } catch (error) {
      throw error;
    }
  }

  async initializeData() {
    await this.initializeUsers();
    await this.initializeAccounts();
  }

  async initializeUsers() {
    const users = await this.findAll();

    if (users.length === 0) {
      const initializeUserCount = 3;

      for (let i = 0; i < initializeUserCount; i++) {
        const newUser = new User(`user_${i}`, `test_${i}@gmail.com`);
        await this.userService.create(newUser);
      }
    }
  }

  async initializeAccounts() {
    const accounts = await this.findAll();

    if (accounts.length === 0) {
      const users = await this.userService.findAll();

      users.forEach((user) => {
        const newAccount = new Account(user._id, 1000);
        this.create(newAccount);
      });
    }
  }

  async create(account: Account) {
    const newAccount = new this.accountModel(account);
    return await newAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return await this.accountModel.find({}, { __v: 0 }).exec();
  }

  async accountBalance(userId: string): Promise<Account[]> {
    if (!userId) {
      throw new Error('Please provide a userId');
    }
    return this.accountModel
      .find({ userId: new Types.ObjectId(userId) }, { __v: 0 })
      .exec();
  }

  async updateBalance(accountId: string, type: string, amount: number) {
    const accountBsonId = new Types.ObjectId(accountId);
    const account = await this.accountModel
      .findOne({ _id: accountBsonId })
      .exec();

    if (account == null) {
      throw new NotFoundException('Account not found');
    }

    const newBalance = this.calculateBalance(type, account.balance, amount);

    this.accountModel
      .updateOne({ _id: accountBsonId }, { $set: { balance: newBalance } })
      .exec();
    return true;
  }

  calculateBalance(
    type: string,
    currentBalance: number,
    amount: number,
  ): number {
    if (type === transactionTypes.DEPOSIT) {
      return currentBalance + amount;
    } else {
      if (amount > currentBalance) {
        throw new BadRequestException('Insufficient funds');
      }

      return currentBalance - amount;
    }
  }
}
