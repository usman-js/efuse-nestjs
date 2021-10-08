import { MongooseModel } from '../../interfaces/mongoose.interface';
import { InjectModel } from '../../transformers/model.transformer';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create.dto';
import { UpdatePostDto } from './dtos/update.dto';
import { Post } from './post.model';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post) private readonly postModel: MongooseModel<Post>,
    ) { }
    
    async postsList() {
        return await this.postModel.find({}).populate('user');
      }
    
      async detail(postId: string) {
        return await this.postModel.findById(postId).populate('user');
      }
    
      async create(body: CreatePostDto) {
          return await (await this.postModel.create(body)).populate('user');
      }
    
      async update(postId: string, body: UpdatePostDto) {
          return await (await this.postModel.findByIdAndUpdate(
              postId,
              { ...body },
              { new: true },
          )).populate('user')
      }
    
    async usersPost(userId: string) {
        return await this.postModel.find({user: userId}).populate('user');
    }
}
