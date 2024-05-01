import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { RegisterRequestDto } from './dto/request/RegisterRequestDto';
import { LoginRequestDto } from './dto/request/LoginRequestDto';
import { LoginResponseDto } from './dto/response/LoginResponseDto';

import { User } from './user.schema';
import { ReqUser } from './user.middleware';
import { UserGuard } from './user.guard';

@ApiTags('User')
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: '내 정보 조회하기' })
  @ApiBearerAuth()
  @Get()
  @UseGuards(UserGuard)
  async me(@ReqUser() user: User): Promise<User> {
    return user;
  }

  @ApiOperation({ summary: '가입하기' })
  @Put()
  async register(@Body() requestDto: RegisterRequestDto): Promise<void> {
    const { username, email, password } = requestDto;

    await this.userService.register(username, email, password);
  }

  @ApiOperation({ summary: '로그인하기' })
  @Post()
  async login(@Body() requestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const { username, password } = requestDto;

    const token = await this.userService.login(username, password);

    return { token };
  }
}
