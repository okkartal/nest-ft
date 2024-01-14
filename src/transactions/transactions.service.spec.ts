import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsModule } from '../accounts/accounts.module';
import { TransactionSchema } from './schemas/transaction.schema';
import { TransactionsService } from './transactions.service';
import { config } from '../config/config';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AccountsModule,
        MongooseModule.forFeature([
          { name: 'Transaction', schema: TransactionSchema },
        ]),
        MongooseModule.forRoot(config.mongoUri),
      ],
      providers: [TransactionsService],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
