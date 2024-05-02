import { Body, Controller, Delete, Get, Param, Patch, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateCommentRequestDto } from './dto/request/CreateCommentRequestDto';

import { CommentService } from './comment.service';

import { ReqUser } from '../user/user.middleware';
import { User } from '../user/user.schema';

@ApiTags('Comment')
@Controller('/api/comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ summary: '댓글 목록 조회' })
  @Get('/:boardId')
  async getComments(@Param('boardId') boardId: string) {
    return await this.commentService.getComments(boardId);
  }

  @ApiOperation({ summary: '댓글 생성' })
  @Put('/:boardId')
  async createComment(
    @ReqUser() user: User,
    @Param('boardId') boardId: string,
    @Body() requestDto: CreateCommentRequestDto,
  ) {
    const { content } = requestDto;

    return await this.commentService.createComment(content, user, boardId);
  }

  @ApiOperation({ summary: '댓글 업데이트' })
  @Patch('/:commentId')
  async updateComment(
    @ReqUser() user: User,
    @Param('commentId') commentId: string,
    @Body() requestDto: CreateCommentRequestDto,
  ) {
    const { content } = requestDto;

    return await this.commentService.updateComment(commentId, content, user);
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @Delete('/:commentId')
  async deleteComment(@ReqUser() user: User, @Param('commentId') commentId: string) {
    return await this.commentService.deleteComment(commentId, user);
  }
}
