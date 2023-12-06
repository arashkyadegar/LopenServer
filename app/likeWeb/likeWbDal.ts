
import { MongoDb } from "../config/mongodb";
import { LikeEntity } from "../like/likeEntity";
import { LikeWbDalLogger } from "../logger/likeWbLogger";
var ObjectId = require("mongodb").ObjectId;

export interface LikeWbDal {
  deleteOne(likeEntity: LikeEntity): Promise<boolean>;
  insertOne(likeEntity: LikeEntity): Promise<boolean>;
}

export class LikeWbDalConc implements LikeWbDal {
  logger: any;
  constructor() {
    this.logger = new LikeWbDalLogger();
  }
  async deleteOne(likeEntity: LikeEntity): Promise<boolean> {
    let result;
    try {
      let wbuserIdObjectId = new ObjectId(likeEntity.wbuserId);
      let productIdObjectId = new ObjectId(likeEntity.productId);
      const collection = MongoDb.dbconnect("likes");
      await collection.then((likes) => {
        result = likes.deleteOne({
          wbuserId: wbuserIdObjectId,
          productId: productIdObjectId,
        });
      });
    } catch (err: any) {
      this.logger.logError(err, "deleteOne");
    }
    return result;
  }
  async insertOne(likeEntity: LikeEntity): Promise<boolean> {
    let result;
    try {
      let wbuserIdObjectId = new ObjectId(likeEntity.wbuserId);
      let productIdObjectId = new ObjectId(likeEntity.productId);
      const collection = MongoDb.dbconnect("likes");
      await collection.then((likes) => {
        result = likes.insertOne({
          wbuserId: wbuserIdObjectId,
          productId: productIdObjectId,
          date: Date.now(),
        });
      });
    } catch (err: any) {
      this.logger.logError(err, "insertOne");
    }
    return result;
  }
}
