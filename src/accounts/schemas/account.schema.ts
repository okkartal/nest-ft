import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema } from '../../shared/schemas/base-schema';

@Schema()
export class Account extends BaseSchema {
  constructor(userId: Types.ObjectId, balance: number) {
    super();
    this.userId = userId;
    this.balance = balance;
  }

  @Prop()
  userId: Types.ObjectId;

  @Prop()
  balance: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
