import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiOperation({ summary: 'APIs Version' })
  @ApiResponse({
    status: 200,
    description: 'Return the APIs version',
    type: String,
  })
  appVersion(): string {
    return 'E-Fuse APIs ';
  }
}
