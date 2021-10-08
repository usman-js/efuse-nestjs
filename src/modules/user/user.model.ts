import { modelOptions, prop } from '@typegoose/typegoose';
import { getProviderByTypegooseClass } from '../../transformers/model.transformer';

@modelOptions({
  schemaOptions: { timestamps: { createdAt: true, updatedAt: false } },
})
export class User {
  @prop({ required: true, trim: true })
  firstName: string;

  @prop({ required: true, trim: true })
  lastName: string;

  @prop({ required: true, trim: true })
  username: string;

  @prop({ required: true, unique: true, trim: true })
  email: string;
}

export const UserProvider = getProviderByTypegooseClass(User);
