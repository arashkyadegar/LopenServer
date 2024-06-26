import { MongoDb } from "../config/mongodb";
import { DiscountDalLogger } from "../logger/discountLogger";
import { DiscountEntity } from "./discountEntity";
var ObjectId = require("mongodb").ObjectId;

export interface DiscountDal {
  updateOne(id: string, entity: DiscountEntity): Promise<boolean>;
  findOne(id: string): Promise<DiscountEntity>;
  createOne(entity: DiscountEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<DiscountEntity[]>;
  findByProductId(productId: string): Promise<DiscountEntity[]>;
}

export class DiscountDalConc implements DiscountDal {
  logger: any;
  constructor() {
    this.logger = new DiscountDalLogger();
  }

  async findByProductId(productId: string): Promise<DiscountEntity[]> {
    let result;
    try {
      const productObjectId = new ObjectId(productId);
      const collection = MongoDb.dbconnect("discounts");
      await collection.then((discounts) => {
        result = discounts.find({ productId: productObjectId }).toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findByProductId");
    }
    return result;
  }

  async updateOne(id: string, entity: DiscountEntity): Promise<boolean> {
    let result;
    try {
      const objectId = new ObjectId(id);
      const productObjectId = new ObjectId(entity.productId);
      const collection = MongoDb.dbconnect("discounts");
      await collection.then((discounts) => {
        result = discounts.updateOne(
          {
            _id: objectId,
          },
          {
            $set: {
              sDate: entity.sDate,
              eDate: entity.eDate,
              title: entity.title,
              type: entity.type,
              value: entity.value,
              productId: productObjectId,
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
  async findOne(id: string): Promise<DiscountEntity> {
    let result;
    try {
      const objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("discounts");
      await collection.then((discounts) => {
        result = discounts.find({ _id: objectId }).toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }
  async createOne(entity: DiscountEntity): Promise<boolean> {
    let result;
    let productObjectId = "";
    try {
      if (entity.productId == "") {
        productObjectId = "";
      } else {
        productObjectId = new ObjectId(entity.productId);
      }

      const collection = MongoDb.dbconnect("discounts");
      await collection.then((discounts) => {
        result = discounts.insertOne({
          sDate: entity.sDate,
          eDate: entity.eDate,
          title: entity.title,
          type: entity.type,
          value: entity.value,
          productId: productObjectId,
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
      const collection = MongoDb.dbconnect("discounts");
      await collection.then((discounts) => {
        result = discounts.deleteOne({
          _id: objectId,
        });
      });
    } catch (err: any) {
      this.logger.logError(err, "deleteOne");
      return err;
    }
    return result;
  }
  async findAll(): Promise<DiscountEntity[]> {
    let result;
    try {
      const collection = MongoDb.dbconnect("discounts");
      await collection.then((discounts) => {
        result = discounts
          .aggregate([
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
              },
            },
            { $addFields: { product: { $first: "$product" } } },
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
