import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { getProviderByTypegooseClass } from '../../transformers/model.transformer';
import { User } from '../user/user.model';

@modelOptions({
  schemaOptions: { timestamps: { createdAt: true, updatedAt: false } },
})
export class Post {
  @prop({ required: true, trim: true })
  title: string;

  @prop({ required: true, trim: true })
  content: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

export const PostProvider = getProviderByTypegooseClass(Post);
