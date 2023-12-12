import {
  FactorDetailEntity,
  FactorDetailSchema,
} from "../factorDetail/factorDetailEntity";
import { FactorDetailWbRouterClassLogger } from "../logger/factorDetailLogger";
import { ResponseStatus } from "../utility/errorStatus";
import { FactorDetailWbBus } from "./factorDetailWbBus";
import validator from "validator";

export class FactorDetailWbRouterClass {
  bus: FactorDetailWbBus;
  logger: any;
  constructor(b: FactorDetailWbBus) {
    this.bus = b;
    this.logger = new FactorDetailWbRouterClassLogger();
  }

  async deleteOne(req, res, next) {
    let result;
    if (req.params.id === undefined) {
      const errorResponse = `validation failed. id is not provided`;
      this.logger.logError(errorResponse, "deleteOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.id.toString())) {
      const errorResponse = `validation failed. id is not valid`;
      this.logger.logError(errorResponse, "deleteOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let id = req.params.id;
    result = await this.bus.deleteOne(id);

    if (result === undefined) {
      const errorResponse = `item not found.`;
      this.logger.logError(errorResponse, "deleteOne");
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

  async findAll(req, res, next) {
    let result;
    if (req.params.fid === undefined) {
      const errorResponse = `validation failed. id is not provided`;
      this.logger.logError(errorResponse, "findOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.fid.toString())) {
      const errorResponse = `validation failed. id is not valid`;
      this.logger.logError(errorResponse, "findOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let factorId = req.params.fid;
    result = await this.bus.findAll(factorId);

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
    let userId: string = "";

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
    const factorDetailEntity = req.body as FactorDetailEntity;
    const { error } = FactorDetailSchema.validate(factorDetailEntity);
    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "updateOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }

    result = await this.bus.updateOne(id, factorDetailEntity);

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
    const factorDetailEntity = req.body as FactorDetailEntity;
    const { error } = FactorDetailSchema.validate(factorDetailEntity);
    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "createOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }
    result = await this.bus.createOne(factorDetailEntity);
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
}

module.exports = { FactorDetailWbRouterClass };
