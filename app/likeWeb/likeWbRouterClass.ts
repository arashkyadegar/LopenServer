import { ILike, LikeEntitySchema } from "../like/likeEntity";
import { LikeWbRouterClassLogger } from "../logger/likeWbLogger";
import { ResponseStatus } from "../utility/errorStatus";
import { LikeWbBus } from "./likeWbBus";

export class LikeWbRouterClass {
  bus: LikeWbBus;
  logger: any;
  constructor(b: LikeWbBus) {
    this.bus = b;
    this.logger = new LikeWbRouterClassLogger();
  }

  async deleteOneLike(req, res, next) {
    let result;
    const likeEntity = req.body as ILike;
    const { error } = LikeEntitySchema.validate(likeEntity);
    console.log(error);
    if (error) {
      this.logger.logError(error, "deleteOneLike");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: error,
      };
    } else {
      result = await this.bus.deleteOneLike(likeEntity);
      return {
        status: ResponseStatus.OK,
        message: result,
      };
    }
  }

  async createOneLike(req, res, next): Promise<any> {
    let result;
    const likeEntity = req.body as ILike;
    const { error } = LikeEntitySchema.validate(likeEntity);
    console.log(error);
    if (error) {
      this.logger.logError(error, "createOneLike");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: error,
      };
    } else {
      result = await this.bus.insertOne(likeEntity);
      if (!result)
        return {
          status: ResponseStatus.BAD_REQUEST,
          message: result,
        };

      return {
        status: ResponseStatus.OK,
        message: result,
      };
    }
  }
}
