import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardRequestDto {
  @ApiProperty({
    description: '제목 (1 ~ 40자)',
    example: '테스트 게시글',
  })
  @IsNotEmpty()
  @Length(1, 40)
  title: string;

  @ApiProperty({
    description: '내용 (10자 이상)',
    example: '테스트 게시글입니다.',
  })
  @IsNotEmpty()
  @Length(10)
  content: string;
}
