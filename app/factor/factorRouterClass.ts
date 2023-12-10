import validator from "validator";
import { FactorBus } from "./factorBus";
import { ResponseStatus } from "../utility/errorStatus";
import { FactorEntity, FactorSchema } from "./factorEntity";
import { FactorRouterClassLogger } from "../logger/factorLogger";

export class FactorRouterClass {
  bus: FactorBus;
  logger: any;
  constructor(b: FactorBus) {
    this.bus = b;
    this.logger = new FactorRouterClassLogger();
  }

  async findAll(req, res, next): Promise<any> {
    const result = await this.bus.findAll();
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
  async findOne(req, res, next) {
     let result;
     if (req.params.id === undefined) {
       const errorResponse = `validation failed. id is not provided`;
       this.logger.logError(errorResponse, "findOne");
       return {
         status: ResponseStatus.BAD_REQUEST,
         message: errorResponse,
       };
     }
 
     if (!validator.isMongoId(req.params.id.toString())) {
       const errorResponse = `validation failed. id is not valid`;
       this.logger.logError(errorResponse, "findOne");
       return {
         status: ResponseStatus.BAD_REQUEST,
         message: errorResponse,
       };
     }
 
     let id = req.params.id;
     result = await this.bus.findOne(id);
 
     if (result === undefined) {
       const errorResponse = `item not found.`;
       this.logger.logError(errorResponse, "findOne");
       return {
         status: ResponseStatus.NOT_FOUND,
         message: errorResponse,
       };
     }
     return {
       status: ResponseStatus.OK,
       message: result,
     };
   }
 
   async updateOne(req, res, next): Promise<any> {
     let result;

     if (req.params.id === undefined) {
       const errorResponse = `validation failed. id is not provided`;
       this.logger.logError(errorResponse, "updateOne");
       return {
         status: ResponseStatus.BAD_REQUEST,
         message: errorResponse,
       };
     }
 
     if (!validator.isMongoId(req.params.id.toString())) {
       const errorResponse = `validation failed. id is not valid`;
       this.logger.logError(errorResponse, "updateOne");
       return {
         status: ResponseStatus.BAD_REQUEST,
         message: errorResponse,
       };
     }
 
     let id = req.params.id;
     const factorEntity = req.body as FactorEntity;
     const { error } = FactorSchema.validate(factorEntity);
     if (error) {
       const errorResponse = `validation failed. errors: ${error} `;
       this.logger.logError(errorResponse, "updateOne");
       return {
         message: errorResponse,
         status: ResponseStatus.BAD_REQUEST,
       };
     }
 
     result = await this.bus.updateOne(id, factorEntity);
 
     if (result === undefined) {
       const errorResponse = `item not found.`;
       this.logger.logError(errorResponse, "updateOne");
       return {
         status: ResponseStatus.NOT_FOUND,
         message: errorResponse,
       };
     }
     return {
       status: ResponseStatus.OK,
       message: result,
     };
   }
   async createOne(req, res, next): Promise<any> {
     let result;
     const factorEntity = req.body as FactorEntity;
     const { error } = FactorSchema.validate(factorEntity);
     if (error) {
       const errorResponse = `validation failed. errors: ${error} `;
       this.logger.logError(errorResponse, "createOne");
       return {
         message: errorResponse,
         status: ResponseStatus.BAD_REQUEST,
       };
     }
     result = await this.bus.createOne(factorEntity);
     return {
       status: ResponseStatus.OK,
       message: result,
     };
   }
}
module.exports = { FactorRouterClass };