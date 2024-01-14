import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schemas/transaction.schema';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [AccountsModule, MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema}])],  
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
