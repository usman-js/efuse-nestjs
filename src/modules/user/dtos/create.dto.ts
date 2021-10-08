import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'firstName' })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'lastName' })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'username' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'email' })
  email: string;
}
