import { MongoDb } from "../config/mongodb";
import { CommentDalLogger } from "../logger/commentLogger";
import { CommentEntity } from "./commentEntity";
import validator from "validator";
var ObjectId = require("mongodb").ObjectId;

export interface CommentDal {
  updateOne(id: string, entity: CommentEntity): Promise<boolean>;
  findOne(id: string): Promise<CommentEntity>;

  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<CommentEntity[]>;
}
export class CommentDalConc implements CommentDal {
  logger: any;
  constructor() {
    this.logger = new CommentDalLogger();
  }
  async updateOne(id: string, entity: CommentEntity): Promise<boolean> {
    let result;
    try {
      const objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("comments");
      await collection.then((comments) => {
        result = comments.updateOne(
          {
            _id: objectId,
          },
          {
            $set: {
              // wbuserId: entity.wbuserId,
              // productId: entity.productId,
              // text: validator.escape(entity.text),
              isVisible: entity.isVisible,
              date: Date.now(),
            },
          }
        );
      });
    } catch (err: any) {
      this.logger.logError(err, "updateOne");
    }
    return result;
  }
  async findOne(id: string): Promise<CommentEntity> {
    let result;
    try {
      const objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("comments");
      await collection.then((comments) => {
        result = comments.find({ _id: objectId }).toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }

  async deleteOne(id: string): Promise<boolean> {
    let result;
    try {
      let objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("comments");
      await collection.then((comments) => {
        result = comments.deleteOne({
          _id: objectId,
        });
      });
    } catch (err: any) {
      this.logger.logError(err, "deleteOne");
      return err;
    }
    return result;
  }
  async findAll(): Promise<CommentEntity[]> {
    let result;
    try {
      const collection = MongoDb.dbconnect("comments");
      await collection.then((comments) => {
        result = comments
          .aggregate([
            {
              $lookup: {
                from: "wbusers",
                localField: "wbuserId",
                foreignField: "_id",
                as: "wbuser",
              },
            },
          ])
          .sort({ date: -1 })
          .toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findAll");
    }
    return result;
  }
}
