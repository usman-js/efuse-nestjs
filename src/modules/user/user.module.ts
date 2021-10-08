import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserProvider } from './user.model';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserProvider],
})
export class UserModule {}
