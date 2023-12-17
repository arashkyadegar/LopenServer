import express from "express";
import { CommentWbRouterClassLogger } from "../logger/commentLogger";
import { CommentWbBus } from "./commentWbBus";
import { ResponseStatus } from "../utility/errorStatus";
import { CommentEntity, CommentSchema } from "../comment/commentEntity";
import validator from "validator";

export class CommentWbRouterClass {
  bus: CommentWbBus;
  logger: any;
  constructor(b: CommentWbBus) {
    this.bus = b;
    this.logger = new CommentWbRouterClassLogger();
  }

  async findAllBywbuserId(req, res, next): Promise<any> {

    if (req.params.wbuserId === undefined) {
      const errorResponse = `validation failed. wbuserId is not provided`;
      this.logger.logError(errorResponse, "findAllBywbuserId");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.wbuserId.toString())) {
      const errorResponse = `validation failed. wbuserId is not valid`;
      this.logger.logError(errorResponse, "findAllBywbuserId");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let wbuserId = req.params.wbuserId;
    const result = await this.bus.findAllBywbuserId(wbuserId);
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
  async createOne(req, res, next): Promise<any> {
    let result;
    const commentEntity = req.body as CommentEntity;
    const { error } = CommentSchema.validate(commentEntity);
    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "createOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }
    result = await this.bus.createOne(commentEntity);
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
}
module.exports = { CommentWbRouterClass };
