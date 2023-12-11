import { ScoreWbRouterClassLogger } from "../logger/scoreWbLogger";
import { IScore, ScoreSchema } from "../score/scoreEntity";
import { ResponseStatus } from "../utility/errorStatus";
import { ScoreWbBus } from "./scoreWbBus";
import validator from "validator";

export class ScoreWbRouterClass {
  bus: ScoreWbBus;
  logger: any;
  constructor(b: ScoreWbBus) {
    this.bus = b;
    this.logger = new ScoreWbRouterClassLogger();
  }

  async updateOneScore(req, res, next): Promise<any> {
    let result;
    const scoreEntity = req.body as IScore;

    if (req.params.id === undefined) {
      const errorResponse = `validation failed. id is not provided`;
      this.logger.logError(errorResponse, "updateOneScore");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.id.toString())) {
      const errorResponse = `validation failed. id is not valid`;
      this.logger.logError(errorResponse, "deleteOneProduct");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    const { error } = ScoreSchema.validate(scoreEntity);
    if (error) {
      this.logger.logError(error, "createOneScore");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: error,
      };
    } else {
      const id = req.params.id;
      result = await this.bus.updateOneScore(id, scoreEntity);
      return {
        status: ResponseStatus.OK,
        message: result,
      };
    }
  }
}
