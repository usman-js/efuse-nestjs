import { AppModule } from '../../../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from '../post.controller';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common';

describe('PostController', () => {
  let controller: PostController
  let httpServer: any;
  let app: any;;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
    controller = module.get<PostController>(PostController);  
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return 200 statusCode on post list',async () => {
    const res = await request(httpServer)
      .get('/post')
      .set('Accept', 'application/json');
    expect(res.body.statusCode).toBe(HttpStatus.OK);
  })

});
