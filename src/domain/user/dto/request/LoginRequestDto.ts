import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    description: '아이디',
    example: 'test1234',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'Test1234',
  })
  @IsNotEmpty()
  password: string;
}
