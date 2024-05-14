import { ProductEntity, ProductWbEntity } from "../product/productEntity";
import validator from "validator";
import { ProductDalLogger } from "../logger/productLogger";
import { MongoDb } from "../config/mongodb";
var ObjectId = require("mongodb").ObjectId;
export interface ProductWbDal {
  // updateOne(id: string, entity: ProductEntity): Promise<boolean>;
  findOne(id: string, today: string): Promise<ProductWbEntity>;
  findAll(today: string): Promise<ProductWbEntity[]>;
  findByPage(page: number): Promise<ProductWbEntity[]>;
}
export class ProductWbDalConc implements ProductWbDal {
  logger: any;
  constructor() {
    this.logger = new ProductDalLogger();
  }

  async findOne(id: string, today: string): Promise<ProductWbEntity> {
    let result;
    try {
      const objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("products");
      await collection.then((products) => {
        result = products
          .aggregate([
            { $match: { _id: objectId } },
            {
              $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "productId",
                as: "likes",
              },
            },
            {
              $lookup: {
                from: "scores",
                localField: "_id",
                foreignField: "productId",
                as: "scores",
              },
            },
            {
              $lookup: {
                from: "discounts",
                localField: "_id",
                foreignField: "productId",
                as: "discounts",
              },
            },

            { $addFields: { liked: false } },
          ])
          .toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findAll");
    }
    return result;
  }

  async findAll(today: string): Promise<ProductWbEntity[]> {
    let result;
    try {
      const collection = MongoDb.dbconnect("products");
      await collection.then((products) => {
        result = products
          .aggregate([
            { $match: { display: true } },
            {
              $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "productId",
                as: "likes",
              },
            },
            {
              $lookup: {
                from: "scores",
                localField: "_id",
                foreignField: "productId",
                as: "scores",
              },
            },
            {
              $lookup: {
                from: "discounts",
                localField: "_id",
                foreignField: "productId",
                as: "discounts",
              },
            },

            { $addFields: { liked: false } },
          ])

          .sort({ name: 1, date: -1 })
          .toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findAll");
    }
    return result;
  }

  async findByPage(page: number): Promise<ProductWbEntity[]> {
    let result;
    try {
      const collection = MongoDb.dbconnect("products");
      let skipNumber = page * 5;
      await collection.then((products) => {
        result = products
          .find({})
          .skip(skipNumber)
          .limit(5)
          .sort({ date: -1 })
          .toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "find");
    }

    return result;
  }
}
