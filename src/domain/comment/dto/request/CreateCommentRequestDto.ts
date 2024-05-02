import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentRequestDto {
  @ApiProperty({
    description: '내용 (10자 이상)',
    example: '테스트 댓글입니다.',
  })
  @IsNotEmpty()
  @Length(10)
  content: string;
}
