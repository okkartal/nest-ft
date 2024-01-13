import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';
import { config } from './config/config';

@Module({
  imports: [
  ConfigModule.forRoot(),
  MongooseModule.forRoot(config.mongoUri), 
  UsersModule, 
  AccountsModule, 
  TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }

}
