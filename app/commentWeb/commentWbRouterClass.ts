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
    if (req.params.userId === undefined) {
      const errorResponse = `validation failed. userId is not provided`;
      this.logger.logError(errorResponse, "findAllBywbuserId");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.userId.toString())) {
      const errorResponse = `validation failed. userId is not valid`;
      this.logger.logError(errorResponse, "findAllBywbuserId");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let userId = req.params.userId;
    const result = await this.bus.findAllBywbuserId(userId);
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
  async createOne(req, res, next): Promise<any> {
    let result;
    const faqEntity = req.body as CommentEntity;
    const { error } = CommentSchema.validate(faqEntity);
    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "createOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }
    result = await this.bus.createOne(faqEntity);
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
}
module.exports = { CommentWbRouterClass };
