import { CommentRouterClassLogger } from "../logger/commentLogger";
import { ResponseStatus } from "../utility/errorStatus";
import { CommentBus } from "./commentBus";
import { CommentEntity, CommentSchema } from "./commentEntity";
import validator from "validator";

export class CommentRouterClass {
  bus: CommentBus;
  logger: any;
  constructor(b: CommentBus) {
    this.bus = b;
    this.logger = new CommentRouterClassLogger();
  }

  async findAll(req, res, next): Promise<any> {
    const result = await this.bus.findAll();
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
    const commentEntity = req.body as CommentEntity;
    const { error } = CommentSchema.validate(commentEntity);
    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "updateOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }

    result = await this.bus.updateOne(id, commentEntity);

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
}

module.exports = { CommentRouterClass };