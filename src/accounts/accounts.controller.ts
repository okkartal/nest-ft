import { Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './schemas/account.schema';

@Controller('/api/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Get(':userId')
  async accountBalance(@Param('userId') userId: string): Promise<Account[]> {
    return this.accountsService.accountBalance(userId);
  }
}
