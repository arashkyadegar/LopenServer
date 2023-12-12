import { MongoDb } from "../config/mongodb";
import { FactorDetailEntity } from "../factorDetail/factorDetailEntity";
import { FactorDetailWbDalLogger } from "../logger/factorDetailLogger";
var ObjectId = require("mongodb").ObjectId;
export interface FactorDetailWbDal {
  updateOne(id: string, entity: FactorDetailEntity): Promise<boolean>;
  createOne(entity: FactorDetailEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAllByFactorId(factorId: string): Promise<FactorDetailEntity[]>;
}
export class FactorDetailWbDalConc implements FactorDetailWbDal {
  logger: any;
  constructor() {
    this.logger = new FactorDetailWbDalLogger();
  }
  async updateOne(id: string, entity: FactorDetailEntity): Promise<boolean> {
    let result;
    try {
      const objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("factorDetails");
      await collection.then((factorDetails) => {
        result = factorDetails.updateOne(
          {
            _id: objectId,
          },
          {
            $set: {
              count: entity.count,
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
  async createOne(entity: FactorDetailEntity): Promise<boolean> {
     let result;
     try {
       const factorObjectId = new ObjectId(entity.factorId);
       const productObjectId = new ObjectId(entity.productId);
       const collection = MongoDb.dbconnect("factorDetails");
       await collection.then((factorDetails) => {
         result = factorDetails.insertOne({
           factorId: factorObjectId,
           productId: productObjectId,
           unitPrice: entity.unitPrice,
           discount: entity.discount,
           count: entity.count,
           prices: entity.prices,
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
      const collection = MongoDb.dbconnect("factorDetails");
      await collection.then((factorDetails) => {
        result = factorDetails.deleteOne({
          _id: objectId,
        });
      });
    } catch (err: any) {
      this.logger.logError(err, "deleteOne");
      return err;
    }
    return result;
  }
  async findAllByFactorId(factorId: string): Promise<FactorDetailEntity[]> {
    let result;
    try {
      let factorObjectId = new ObjectId(factorId);
      const collection = MongoDb.dbconnect("factorDetails");
      await collection.then((factorDetails) => {
        result = factorDetails
          .aggregate([
            { $match: { factorId: factorObjectId } },
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
              },
            },
            { $addFields: { liked: false } },
            {
              $project: {
                "product.name": 1,
                factorId: 1,
                productId: 1,
                unitPrice: 1,
                discount: 1,
                count: 1,
                prices: 1,
                date: 1,
              },
            },
          ])
          .toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findAll");
    }
    return result;
  }
}
