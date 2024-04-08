import { ProductEntity } from "./productEntity";
import validator from "validator";
import { ProductDalLogger } from "../logger/productLogger";
import { MongoDb } from "../config/mongodb";
var ObjectId = require("mongodb").ObjectId;

export interface ProductDal {
  updateOne(id: string, entity: ProductEntity): Promise<boolean>;
  findOne(id: string): Promise<ProductEntity>;
  createOne(entity: ProductEntity): Promise<boolean>;
  deleteSoftOneProduct(id: string): Promise<boolean>;
  findAll(): Promise<ProductEntity[]>;
}
export class ProductDalConc implements ProductDal {
  logger: any;
  constructor() {
    this.logger = new ProductDalLogger();
  }
  async updateOne(id: string, entity: ProductEntity): Promise<boolean> {
    let result;
    try {
      const objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("products");
      await collection.then((products) => {
        result = products.updateOne(
          {
            _id: objectId,
          },
          {
            $set: {
              name: validator.escape(entity.name),
              weight: validator.escape(entity.weight),
              size: entity.size,
              healthId: entity.healthId,
              type: validator.escape(entity.type),
              components: validator.escape(entity.components),
              desc: validator.escape(entity.desc),
              score: entity.score,
              price: entity.price,
              display: entity.display,
              isAvailable: entity.isAvailable,
              tags: entity.tags,
              image: validator.escape(entity.image),
              images: entity.images,
              userId: validator.escape(entity.userId),
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
  async findOne(id: string): Promise<ProductEntity> {
    let result;
    try {
      const objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("products");
      await collection.then((products) => {
        result = products.find({ _id: objectId }).toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }
  async createOne(entity: ProductEntity): Promise<boolean> {
    let result;
    try {
      const collection = MongoDb.dbconnect("products");
      await collection.then((products) => {
        result = products.insertOne({
          name: validator.escape(entity.name),
          weight: validator.escape(entity.weight),
          size: entity.size,
          healthId: entity.healthId,
          type: "1",
          components: validator.escape(entity.components),
          desc: validator.escape(entity.desc),
          score: entity.score,
          price: entity.price,
          display: entity.display,
          isAvailable: entity.isAvailable,
          tags: entity.tags,
          image: validator.escape(entity.image),
          images: entity.images,
          userId: validator.escape(entity.userId),
          date: Date.now(),
        });
      });
    } catch (err: any) {
      this.logger.logError(err, "createOne");
    }
    return result;
  }
  async deleteSoftOneProduct(id: string): Promise<boolean> {
    let result;
    try {
      const objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("products");
      await collection.then((products) => {
        result = products.updateOne(
          {
            _id: objectId,
          },
          {
            $set: {
              display: false,
              isAvailable: false,
              date: Date.now(),
            },
          }
        );
      });
    } catch (err: any) {
      this.logger.logError(err, "deleteSoftOneProduct");
    }
    return result;
  }
  async findAll(): Promise<ProductEntity[]> {
    let result;
    try {
      const collection = MongoDb.dbconnect("products");
      await collection.then((products) => {
        result = products.find().sort({ name: 1, date: -1 }).toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findAll");
    }
    return result;
  }
}
