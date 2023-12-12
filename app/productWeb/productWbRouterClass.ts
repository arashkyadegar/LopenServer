import validator from "validator";
import { ProductWbBus } from "./productWbBus";
import { ResponseStatus } from "../utility/errorStatus";
import {
  ProductEntity,
  ProductSchema,
  ProductWbEntity,
} from "../product/productEntity";
import { ProductWbRouterClassLogger } from "../logger/productLogger";

export class ProductWbRouterClass {
  bus: ProductWbBus;
  logger: any;
  constructor(b: ProductWbBus) {
    this.bus = b;
    this.logger = new ProductWbRouterClassLogger();
  }

  async findAll(req, res, next): Promise<any> {
    const result = await this.bus.findAll();
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }

  async findOne(req, res, next): Promise<any> {
    let result;
    let wbuserId: string = "";
    if (req.query.wbuserId != undefined) {
      if (
        !validator.isMongoId(validator.escape(req.query.wbuserId.toString()))
      ) {
        const errorResponse = `validation failed. wbuserId is not valid`;
        this.logger.logError(errorResponse, "findOneProduct");
        return {
          status: ResponseStatus.BAD_REQUEST,
          message: errorResponse,
        };
      }
    } else {
      const errorResponse = `validation failed. wbuserId is not provided`;
      this.logger.logError(errorResponse, "findOneProduct");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (req.params.id === undefined) {
      const errorResponse = `validation failed. id is not provided`;
      this.logger.logError(errorResponse, "findOneProduct");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.id.toString())) {
      const errorResponse = `validation failed. id is not valid`;
      this.logger.logError(errorResponse, "findOneProduct");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let id = req.params.id;
    wbuserId = req.query.wbuserId;
    result = await this.bus.findOne(id, wbuserId);

    if (result === undefined) {
      const errorResponse = `item not found.`;
      this.logger.logError(errorResponse, "findOneProduct");
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
}
module.exports = { ProductWbRouterClass };
