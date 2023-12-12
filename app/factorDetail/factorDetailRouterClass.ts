import validator from "validator";
import { FactorDetailRouterClassLogger } from "../logger/factorDetailLogger";
import { ResponseStatus } from "../utility/errorStatus";
import { FactorDetailBus } from "./factorDetailBus";
import { FactorDetailEntity, FactorDetailSchema } from "./factorDetailEntity";

export class FactorDetailRouterClass {
  bus: FactorDetailBus;
  logger: any;
  constructor(b: FactorDetailBus) {
    this.bus = b;
    this.logger = new FactorDetailRouterClassLogger();
  }

  async findAll(req, res, next): Promise<any> {
    if (req.params.fid === undefined) {
      const errorResponse = `validation failed. factorId is not provided`;
      this.logger.logError(errorResponse, "findOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.fid.toString())) {
      const errorResponse = `validation failed. factorId is not valid`;
      this.logger.logError(errorResponse, "findOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let factorId = req.params.fid;
    const result = await this.bus.findAll(factorId);
    return {
      status: ResponseStatus.OK,
      message: result,
    };
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
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
}

module.exports = { FactorDetailRouterClass };
