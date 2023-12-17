import { MongoDb } from "../config/mongodb";
import { CommentWbDalLogger } from "../logger/commentLogger";
import { CommentEntity } from "../comment/commentEntity";
import validator from "validator";
var ObjectId = require("mongodb").ObjectId;

export interface CommentWbDal {
  createOne(entity: CommentEntity): Promise<boolean>;
  findAllBywbuserId(wbuserId: string): Promise<CommentEntity[]>;
}
export class CommentWbDalConc implements CommentWbDal {
  logger: any;
  constructor() {
    this.logger = new CommentWbDalLogger();
  }


  async createOne(entity: CommentEntity): Promise<boolean> {
    let result;
    try {
      const wbuserIdObjectId = new ObjectId(entity.wbuserId);
      const productIdObjectId = new ObjectId(entity.productId);
      const collection = MongoDb.dbconnect("comments");
      await collection.then((comments) => {
        result = comments.insertOne({
          wbuserId: wbuserIdObjectId,
          productId: productIdObjectId,
          text: validator.escape(entity.text),
          isVisible: false,
          date: Date.now(),
        });
      });
    } catch (err: any) {
      this.logger.logError(err, "createOne");
    }
    return result;
  }
  async findAllBywbuserId(wbuserId: string): Promise<CommentEntity[]> {
    let result;
    try {
      const wbuserIdObjectId = new ObjectId(wbuserId);
      const collection = MongoDb.dbconnect("comments");
      await collection.then((comments) => {
        result = comments
          .find({ wbuserId: wbuserIdObjectId })
          .sort({ date: -1 })
          .toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findAllBywbuserId");
    }
    return result;
  }
}
