import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({
    description: '아이디 (4자 이상 20자 이하)',
    example: 'test1234',
  })
  @IsNotEmpty()
  @Length(4, 20)
  username: string;

  @ApiProperty({
    description: '이메일 (이메일 형식)',
    example: 'test1234@test.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '비밀번호 (영문 대소문자, 숫자 포함 8자 이상)',
    example: 'Test1234',
  })
  @IsNotEmpty()
  @Length(8, 20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
  password: string;
}
