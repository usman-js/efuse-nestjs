import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'firstName' })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'lastName' })
  lastName: string;
}
