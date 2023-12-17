import { FaqEntity } from "./faqEntity";
import validator from "validator";
import { FaqDalLogger } from "../logger/faqLogger";
import { MongoDb } from "../config/mongodb";
var ObjectId = require("mongodb").ObjectId;

export interface FaqDal {
  updateOne(id: string, entity: FaqEntity): Promise<boolean>;
  findOne(id: string): Promise<FaqEntity>;
  createOne(entity: FaqEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<FaqEntity[]>;
}
export class FaqDalConc implements FaqDal {
  logger: any;
  constructor() {
    this.logger = new FaqDalLogger();
  }
  async updateOne(id: string, entity: FaqEntity): Promise<boolean> {
    let result;
    try {
      const objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("faqs");
      await collection.then((faqs) => {
        result = faqs.updateOne(
          {
            _id: objectId,
          },
          {
            $set: {
              groupId: entity.groupId,
              question: validator.escape(entity.question),
              answer: validator.escape(entity.answer),
              display: entity.display,
              priority: entity.priority,
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

  async findOne(id: string): Promise<FaqEntity> {
    let result;
    try {
      const objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("faqs");
      await collection.then((faqs) => {
        result = faqs.find({ _id: objectId }).toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }
  async createOne(entity: FaqEntity): Promise<boolean> {
    let result;
    try {
      const collection = MongoDb.dbconnect("faqs");
      await collection.then((faqs) => {
        result = faqs.insertOne({
          groupId: entity.groupId,
          question: validator.escape(entity.question),
          answer: validator.escape(entity.answer),
          display: entity.display,
          priority: entity.priority,
          date: Date.now(),
        });
      });
    } catch (err: any) {
      this.logger.logError(err, "createOne");
    }
    return result;
  }
  async deleteOne(id: string): Promise<boolean> {
    let result;
    try {
      let objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("faqs");
      await collection.then((faqs) => {
        result = faqs.deleteOne({
          _id: objectId,
        });
      });
    } catch (err: any) {
      this.logger.logError(err, "deleteOne");
      return err;
    }
    return result;
  }
  async findAll(): Promise<FaqEntity[]> {
    let result;
    try {
      const collection = MongoDb.dbconnect("faqs");
      await collection.then((faqs) => {
        result = faqs.find().sort({ date: -1 }).toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findAll");
    }
    return result;
  }
}
