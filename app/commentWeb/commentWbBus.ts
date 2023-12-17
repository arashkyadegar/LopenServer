import { CommentEntity } from "../comment/commentEntity";
import { CommentWbDal } from "./commentWbDal";

export interface CommentWbBus {
  createOne(entity: CommentEntity): Promise<boolean>;
  findAllBywbuserId(wbuserId: string): Promise<CommentEntity[]>;
}

export class CommentWbBusConc implements CommentWbBus {
  private db: CommentWbDal;
  constructor(db: CommentWbDal) {
    this.db = db;
  }

  async createOne(entity: CommentEntity): Promise<boolean> {
    const result = await this.db.createOne(entity);
    return result;
  }
  async findAllBywbuserId(wbuserId: string): Promise<CommentEntity[]> {
    const result = await this.db.findAllBywbuserId(wbuserId);
    return result;
  }
}
