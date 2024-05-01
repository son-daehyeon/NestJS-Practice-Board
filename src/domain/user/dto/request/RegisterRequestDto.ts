import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty()
  @Length(4, 20)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
  password: string;
}
