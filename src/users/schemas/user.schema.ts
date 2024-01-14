import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../shared/schemas/base-schema';

@Schema()
export class User extends BaseSchema {
  constructor(userName: string, email: string) {
    super();
    this.userName = userName;
    this.email = email;
  }

  @Prop()
  userName: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
