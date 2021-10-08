import { AppModule } from '../../../app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';

describe('UserController', () => {
  let controller: UserController;
  let httpServer: any;
  let app: any;
  let userId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
    controller = module.get<UserController>(UserController);   
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return 200 statusCode on user list',async () => {
    const res = await request(httpServer)
      .get('/user')
      .set('Accept', 'application/json');
    expect(res.body.statusCode).toBe(HttpStatus.OK);
  })

  it('should create a user', async () => {
    const body = {
      firstName: "Usman",
      lastName: "Khan",
      username: "usmankhan",
      email:"usmankhan@gmail.com"
    }
    const res = await request(httpServer)
      .post('/user')
      .set('Accept', 'application/json')
      .send(body);
    userId = res.body.payload.user._id;
      expect(res.body.statusCode).toBe(HttpStatus.OK);
      expect(res.body.payload.user.username).toBe(body.username);
  })

  it('should return the user detail', async () => {
   
    const res = await request(httpServer)
      .get(`/user/${userId}`)
      .set('Accept', 'application/json')
      expect(res.body.statusCode).toBe(HttpStatus.OK);
      expect(res.body.payload.user._id).toBe(userId);
  })
});
