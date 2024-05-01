import { Body, Controller, Post, Put } from '@nestjs/common';

import { UserService } from './user.service';

import { RegisterRequestDto } from './dto/request/RegisterRequestDto';
import { LoginRequestDto } from './dto/request/LoginRequestDto';
import { LoginResponseDto } from './dto/response/LoginResponseDto';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Put()
  async register(@Body() requestDto: RegisterRequestDto): Promise<void> {
    const { username, email, password } = requestDto;

    await this.userService.register(username, email, password);
  }

  @Post()
  async login(@Body() requestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const { username, password } = requestDto;

    const token = await this.userService.login(username, password);

    return { token };
  }
}
