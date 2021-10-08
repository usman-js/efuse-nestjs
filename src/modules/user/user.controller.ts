import { IResponse } from '../../interfaces/response.interface';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create.dto';
import { UpdateUserDto } from './dtos/update.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiOperation({ description: 'Users List' })
  @HttpCode(HttpStatus.OK)
  async index(): Promise<IResponse<{ users: User[] }>> {
    const payload = await this.userService.usersList();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users List.',
      payload: { users: payload },
    };
  }

  @Get('/:userId')
  @ApiOperation({ description: 'Users Details' })
  @HttpCode(HttpStatus.OK)
  async detail(
    @Param('userId') userId: string,
  ): Promise<IResponse<{ user: User }>> {
    const payload = await this.userService.detail(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'User Details',
      payload: { user: payload },
    };
  }

  @Post('/')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ description: 'Create User' })
  @HttpCode(HttpStatus.OK)
  async create(
   
    @Body() createUerDto: CreateUserDto,
  ): Promise<IResponse<{ user: User }>> {
    const payload = await this.userService.create(createUerDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User Created',
      payload: { user: payload },
    };
  }

  @Patch('/:userId')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ description: 'Update User' })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IResponse<{ user: User }>> {
    const payload = await this.userService.update(userId, updateUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User Updated.',
      payload: { user: payload },
    };
  }
}
