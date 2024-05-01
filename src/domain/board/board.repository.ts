import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Board } from './board.schema';

import { Model } from 'mongoose';

@Injectable()
export class BoardRepository {
  constructor(@InjectModel(Board.name) private boardModel: Model<Board>) {}

  async save(board: Board): Promise<Board> {
    return await this.boardModel.create(board);
  }

  async findByTitle(title: string): Promise<Board> {
    return await this.boardModel.findOne({ title }).exec();
  }

  async existsByTitle(title: string): Promise<boolean> {
    return !!(await this.boardModel.exists({ title }).exec());
  }
}
