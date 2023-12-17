import { CommentDal } from "./commentDal";
import { CommentEntity } from "./commentEntity";

export interface CommentBus {
  updateOne(id: string, entity: CommentEntity): Promise<boolean>;
  findOne(id: string): Promise<CommentEntity>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<CommentEntity[]>;
}

export class CommentBusConc implements CommentBus {
  private db: CommentDal;
  constructor(db: CommentDal) {
    this.db = db;
  }
  async updateOne(id: string, entity: CommentEntity): Promise<boolean> {
    const result =await this.db.updateOne(id, entity);
    return result;
  }
  async findOne(id: string): Promise<CommentEntity> {
    const result =await this.db.findOne(id);
    return result;
  }

  async deleteOne(id: string): Promise<boolean> {
    const result =await this.db.deleteOne(id);
    return result;
  }
  async findAll(): Promise<CommentEntity[]> {
    const result =await this.db.findAll();
    return result;
  }
}
