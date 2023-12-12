import { MongoDb } from "../config/mongodb";
import { FactorDetailDalLogger } from "../logger/factorDetailLogger";
import { FactorDetailEntity } from "./factorDetailEntity";
var ObjectId = require("mongodb").ObjectId;

export interface FactorDetailDal {
  updateOne(id: string, entity: FactorDetailEntity): Promise<boolean>;
  findOne(id: string): Promise<FactorDetailEntity>;
  createOne(entity: FactorDetailEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAll(factorId: string): Promise<FactorDetailEntity[]>;
}

export class FactorDetailDalConc implements FactorDetailDal {
  logger: any;
  constructor() {
    this.logger = new FactorDetailDalLogger();
  }

  updateOne(id: string, entity: FactorDetailEntity): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async findOne(id: string): Promise<FactorDetailEntity> {
    throw new Error("Method not implemented.");
  }
  createOne(entity: FactorDetailEntity): Promise<boolean> {
    throw new Error("Method not implemented.");
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
  async findAll(factorId: string): Promise<FactorDetailEntity[]> {
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
          ])
          .toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findAll");
    }
    return result;
  }
}
