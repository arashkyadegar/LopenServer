import { LikeEntity } from "../like/likeEntity";
import { LikeWbDal } from "./likeWbDal";


export interface LikeWbBus {
  insertOne(likeEntity: LikeEntity): Promise<boolean>;
  deleteOneLike(likeEntity: LikeEntity): Promise<boolean>;
}

export class LikeWbBusConc implements LikeWbBus {
  private db: LikeWbDal;
  constructor(db: LikeWbDal) {
    this.db = db;
  }

  async deleteOneLike(likeEntity: LikeEntity): Promise<boolean> {
    const result = await this.db.deleteOne(likeEntity);
    return result;
  }

  async insertOne(likeEntity: LikeEntity): Promise<boolean> {
    const result = await this.db.insertOne(likeEntity);
    return result;
  }
}

module.exports = {
  LikeWbBusConc
};
