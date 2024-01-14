import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema } from '../../shared/schemas/base-schema';

@Schema()
export class Transaction extends BaseSchema {
  constructor(accountId: string, type: string, amount: number) {
    super();
    this.accountId = new Types.ObjectId(accountId);
    this.type = type;
    this.amount = amount;
  }

  @Prop()
  accountId: Types.ObjectId;

  @Prop()
  type: string;

  @Prop()
  amount: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
