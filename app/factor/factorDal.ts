import { MongoDb } from "../config/mongodb";
import { FactorDalLogger } from "../logger/factorLogger";
import { FactorEntity } from "./factorEntity";
import validator from "validator";
var ObjectId = require("mongodb").ObjectId;

export interface FactorDal {
  updateOne(id: string, entity: FactorEntity): Promise<boolean>;
  findOne(id: string): Promise<FactorEntity>;
  createOne(entity: FactorEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<FactorEntity[]>;
}

export class FactorDalConc implements FactorDal {
  logger: any;
  constructor() {
    this.logger = new FactorDalLogger();
  }
  async updateOne(id: string, entity: FactorEntity): Promise<boolean> {
     let result;
     try {
       const objectId = new ObjectId(id);
       const collection = MongoDb.dbconnect("factors");
       await collection.then((factors) => {
         result = factors.updateOne(
           {
             _id: objectId,
           },
           {
             $set: {
               factorNumber:validator.escape( entity.factorNumber),
               webUserID:validator.escape( entity.webUserID),
               refCode:validator.escape( entity.refCode),
               factorContent:validator.escape( entity.factorContent),
               additionalInfo:validator.escape( entity.additionalInfo),
               price:validator.escape( entity.price),
               statusID: entity.statusID,
               paymentType: entity.paymentType,
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
  async findOne(id: string): Promise<FactorEntity> {
    let result;
    try {
      const objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("factors");
      await collection.then((factors) => {
        result = factors.find({ _id: objectId }).toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }
  async createOne(entity: FactorEntity): Promise<boolean> {
    let result;
    try {
      const collection = MongoDb.dbconnect("factors");
      await collection.then((factors) => {
        result = factors.insertOne({
          factorNumber:validator.escape( entity.factorNumber),
          webUserID:validator.escape( entity.webUserID),
          refCode:validator.escape( entity.refCode),
          factorContent:validator.escape( entity.factorContent),
          additionalInfo:validator.escape( entity.additionalInfo),
          price:validator.escape( entity.price),
          statusID: entity.statusID,
          paymentType: entity.paymentType,
          date: Date.now(),
        });
      });
    } catch (err: any) {
      this.logger.logError(err, "createOne");
    }
    return result;
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<FactorEntity[]> {
    let result;
    try {
      const collection = MongoDb.dbconnect("factors");
      await collection.then((factors) => {
        result = factors.find().sort({ date: -1 }).toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "findAll");
    }
    return result;
  }
}