import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionFactory {
  static of(exceptions: Exceptions): HttpException {
    return new HttpException(exceptions, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export enum Exceptions {
  EMAIL_ALREADY_EXISTS = '이미 존재하는 이메일입니다.',
  USERNAME_ALREADY_EXISTS = '이미 존재하는 아이디입니다.',

  USER_NOT_FOUND = '존재하지 않는 사용자입니다.',
  PASSWORD_INCORRECT = '비밀번호가 일치하지 않습니다.',

  BOARD_NOT_FOUND = '존재하지 않는 게시글입니다.',
}
