import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'title' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'content' })
  content: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'user' })
  user: string;
}
