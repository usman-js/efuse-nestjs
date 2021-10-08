import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostProvider } from './post.model';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostProvider],
})
export class PostModule {}
