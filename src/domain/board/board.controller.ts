import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { CreateBoardRequestDto } from './dto/request/CreateBoardRequestDto';

import { BoardService } from './board.service';
import { Board } from './board.schema';

import { UserGuard } from '../user/user.guard';
import { ReqUser } from '../user/user.middleware';
import { User } from '../user/user.schema';

@Controller('/api/board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  async getBoards() {
    return await this.boardService.getBoards();
  }

  @Post('/:boardId')
  async getBoard(@Param('boardId') boardId: string): Promise<Board> {
    return await this.boardService.getBoard(boardId);
  }

  @Put()
  @UseGuards(UserGuard)
  async createBoard(
    @ReqUser() user: User,
    @Body() requestDto: CreateBoardRequestDto,
  ): Promise<Board> {
    const { title, content } = requestDto;

    return await this.boardService.createBoard(title, content, user);
  }
}
