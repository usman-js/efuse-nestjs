import { IResponse } from '@app/interfaces/response.interface';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create.dto';
import { UpdatePostDto } from './dtos/update.dto';
import { Post as PostModel } from './post.model';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('post')
export class PostController {
    constructor(private readonly postService: PostService) { }
    
    @Get('/')
  @ApiOperation({ description: 'Post List' })
  @HttpCode(HttpStatus.OK)
  async index(): Promise<IResponse<{ posts: PostModel[] }>> {
    const payload = await this.postService.postsList();
    return {
      statusCode: HttpStatus.OK,
      message: 'Posts List.',
      payload: { posts: payload },
    };
  }

  @Get('/:postId')
  @ApiOperation({ description: 'Post Details' })
  @HttpCode(HttpStatus.OK)
  async detail(
    @Param('postId') postId: string,
  ): Promise<IResponse<{ post: PostModel }>> {
    const payload = await this.postService.detail(postId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Post Details',
      payload: { post: payload },
    };
  }
    
  @Get('/user/:userId')
  @ApiOperation({ description: 'User Posts' })
  @HttpCode(HttpStatus.OK)
  async userPosts(
    @Param('userId') userId: string,
  ): Promise<IResponse<{ posts: PostModel[] }>> {
    const payload = await this.postService.usersPost(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'User Posts',
      payload: { posts: payload },
    };
  }

  @Post('/')
  @ApiBody({ type: CreatePostDto })
  @ApiOperation({ description: 'Create Post' })
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<IResponse<{ post: PostModel}>> {
    const payload = await this.postService.create(createPostDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Post Created',
      payload: { post: payload },
    };
  }

  @Patch('/:postId')
  @ApiBody({ type: UpdatePostDto })
  @ApiOperation({ description: 'Update Post' })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<IResponse<{ post: PostModel }>> {
    const payload = await this.postService.update(postId, updatePostDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Post Updated',
      payload: { post: payload },
    };
  }
}
