import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'title' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, title: 'content' })
  content: string;
}
