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
              factorNumber: validator.escape(entity.factorNumber),
              wbuserId: validator.escape(entity.wbuserId),
              refCode: validator.escape(entity.refCode),
              factorContent: validator.escape(entity.factorContent),
              additionalInfo: validator.escape(entity.additionalInfo),
              price: entity.price,
              statusId: entity.statusId,
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
      let objectId = new ObjectId(id);
      const collection = MongoDb.dbconnect("factors");
      await collection.then((factors) => {
        result = factors
          .aggregate([
            { $match: { _id: objectId } }
          ])
          .toArray();
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
          factorNumber: validator.escape(entity.factorNumber),
          wbuserId: validator.escape(entity.wbuserId),
          refCode: validator.escape(entity.refCode),
          factorContent: validator.escape(entity.factorContent),
          additionalInfo: validator.escape(entity.additionalInfo),
          price: entity.price,
          statusId: entity.statusId,
          paymentType: entity.paymentType,
          fName: validator.escape(entity.fName),
          lName: validator.escape(entity.lName),
          mobile: validator.escape(entity.mobile),
          email: validator.escape(entity.email),
          tel: validator.escape(entity.tel),
          state: validator.escape(entity.state),
          city: validator.escape(entity.city),
          postalCode: validator.escape(entity.postalCode),
          address: validator.escape(entity.address),
          desc: validator.escape(entity.desc),

          cardnumber: entity.cardnumber,
          digitalreceipt: entity.digitalreceipt,
          respcode: entity.respcode,
          invoiceid: entity.invoiceid,
          tracenumber: entity.tracenumber,
          rrn: entity.rrn,
          datePaid: entity.datePaid,
          issuerbank: entity.issuerbank,

          adStatus: entity.adStatus,
          adReturnId: entity.adReturnId,
          adMessage: entity.adMessage,
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
      const collection = MongoDb.dbconnect("factors");
      await collection.then((factors) => {
        result = factors.deleteOne({
          _id: objectId,
        });
      });
    } catch (err: any) {
      this.logger.logError(err, "deleteOne");
      return err;
    }
    return result;
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
