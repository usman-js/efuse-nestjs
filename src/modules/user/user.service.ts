import { MongooseModel } from '../../interfaces/mongoose.interface';
import { InjectModel } from '../../transformers/model.transformer';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.dto';
import { UpdateUserDto } from './dtos/update.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: MongooseModel<User>,
  ) {}

  async usersList() {
    return await this.userModel.find({});
  }

  async detail(userId: string) {
    return await this.userModel.findById(userId);
  }

  async create(body: CreateUserDto) {
    const checkUser = await this.userModel.findOne({
      $or: [{ email: body.email }, { username: body.username }],
    });
    if (checkUser)
      throw new ForbiddenException(
        `This ${
          body.email == checkUser.email ? 'email address' : 'username'
        } has been used already.`,
      );
    return await this.userModel.create(body);
  }

  async update(userId: string, body: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(
      userId,
      { ...body },
      { new: true },
    );
  }
}
